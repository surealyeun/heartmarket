package com.heartmarket.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;
import com.heartmarket.model.dao.MannerRepository;
import com.heartmarket.model.dao.ReviewRepository;
import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Manner;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;
import com.heartmarket.model.dto.response.MyBuyList;
import com.heartmarket.model.dto.response.MySellList;
import com.heartmarket.model.dto.response.OtherResponse;
import com.heartmarket.model.dto.response.OtherTrade;
import com.heartmarket.util.ResultMap;

@Service
public class MypageServiceImpl implements MypageService {

	@Autowired
	UserRepository ur;

	@Autowired
	TradeRepository tr;

	@Autowired
	MannerRepository mr;

	@Autowired
	TradeImgRepository tir;
	
	@Autowired
	ReviewRepository rr;

	// 판매 내역 조회
		// 판매 내역을 조회 할때, 거래완료가 되었는지 확인할 수 있어야 한다.
		// 거래 완료가 됬으면 1, 아니면 0.
		// 0 일 때, 거래완료가 필요.
		@Override
		public ResultMap<Object> getSellList(String email) {
			User tUser = ur.findByEmail(email);
			int seller = tUser.getUserNo(); // 판매자 정보
			try {
				List<Trade> sList = tr.findAllBytUserUserNo(seller);
				if (sList.size() == 0)
					return new ResultMap<Object>("SUCCESS", "판매한 내역이 없습니다.", null);			
				List<MySellList> msList = new ArrayList<MySellList>();
				for (Trade t : sList) {
					if(Objects.isNull(t.getBUser())) {
						msList.add(new MySellList(t, 0));
					}else {
						msList.add(new MySellList(t, 1));
					}
				}
				return new ResultMap<Object>("SUCCESS", "판매한 목록 조회 완료", msList);
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}
		}

		// 구매내역 조회
		// 구매내역을 조회할 때, 평가 여부를 확인할 수 있게 해야한다.
		// 평가가 완료되어있으면 1
		// 아니면 0
		@Override
		public ResultMap<Object> getBuyList(String email) {
			User tUser = ur.findByEmail(email);
			int buyer = tUser.getUserNo(); // 판매자 정보
			try {
				List<Trade> sList = tr.findAllBybUserUserNo(buyer);
				if (sList.size() == 0)
					return new ResultMap<Object>("SUCCESS", "구매한 내역이 없습니다.", null);
				
				List<MyBuyList> mbList = new ArrayList<MyBuyList>();
				for (Trade trade : sList) {
					if(Objects.isNull(rr.findByrTradeTradeNo(trade.getTradeNo()))) {
						mbList.add(new MyBuyList(trade, 0));
					}else {
						mbList.add(new MyBuyList(trade, 1));
					}
				}
				return new ResultMap<Object>("SUCCESS", "구매한 목록 조회 완료", mbList);
			} catch (Exception e) {
				e.printStackTrace();
				throw e;
			}
		}

	// 상대방 프로필을 가져오기
	@Override
	public OtherResponse findOther(int userNo) {

		// 1. 닉네임을 클릭했을 때, 닉네임으로 상대방 정보를 가져옴
		try {
			User oUser = ur.findByUserNo(userNo);
			Manner oMr = mr.findBymUserUserNo(oUser.getUserNo());

			List<OtherTrade> oList = new ArrayList<OtherTrade>();
			// 1-1. 닉네임으로 정보를 불러왔으면, 유저가 판매한 내역을 가져오기
			System.out.println("상대방 유저 번호 및 닉네임 : " + oUser.getNickname() + " | " + oUser.getUserNo());
			List<Trade> tList = tr.findTop4BytUserUserNo(oUser.getUserNo());
			// 1-2. 가져온 게시물을 otherResponse에 매핑
			for (Trade trade : tList) {
				oList.add(new OtherTrade(trade.getTradeNo(), trade.getTradeTitle(), trade.getTradeArea(),
						trade.getProductPrice(), tir.findAllBytiTradeTradeNo(trade.getTradeNo()).get(0).getOrgImg()));
			}

			// 1-3. otherResponse에 매핑
			return new OtherResponse(oUser.getUserNo(), oUser.getProfileImg(), oUser.getNickname(), oMr.getHeartGauge(),
					oList);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}

	@Override
	public List<OtherTrade> findAllByTrade(int no, int userNo) {
		try {
			User oUser = ur.findByUserNo(userNo);
			Manner oMr = mr.findBymUserUserNo(oUser.getUserNo());
			
			int cnt = tr.countAll();
			if (no == 0)
				no = cnt;
			System.out.println(no);
			
			List<Trade> tList= new ArrayList<Trade>();

//			return oList;
			final int num = no;
			tList = tr.findAll(new Specification<Trade>() {
				
				@Override
				public Predicate toPredicate(Root<Trade> root, CriteriaQuery<?> query,
						CriteriaBuilder criteriaBuilder) {
					List<Predicate> list = new ArrayList<Predicate>();

					list.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("tUser").get("userNo"), userNo)));
					list.add(criteriaBuilder.and(criteriaBuilder.lessThan(root.get("tradeNo"), num)));
					return criteriaBuilder.and(list.toArray(new Predicate[list.size()]));
				}
			}, PageRequest.of(0, 8, Sort.by("tradeNo").descending())).getContent();
			
			System.out.println(tList.size());
			List<OtherTrade> oList = new ArrayList<OtherTrade>();
		
			for (Trade trade : tList) {
				System.out.println(trade.toString());
				oList.add(new OtherTrade(trade.getTradeNo(), trade.getTradeTitle(), trade.getTradeArea(),
						trade.getProductPrice(), tir.findAllBytiTradeTradeNo(trade.getTradeNo()).get(0).getOrgImg()));
			}
			System.out.println(oList.size());
			
			return oList;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}