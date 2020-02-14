package com.heartmarket.model.service;

import java.util.ArrayList;
import java.util.List;

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
import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Manner;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;
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

	// 판매 내역 조회
	@Override
	public ResultMap<Object> getSellList(String email) {
		User tUser = ur.findByEmail(email);
		int seller = tUser.getUserNo(); // 판매자 정보
		try {
			List<Trade> sList = tr.findAllBytUserUserNo(seller);
			if (sList.size() == 0)
				return new ResultMap<Object>("SUCCESS", "판매한 내역이 없습니다.", null);
			return new ResultMap<Object>("SUCCESS", "판매한 목록 조회 완료", sList);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public ResultMap<Object> getBuyList(String email) {
		User tUser = ur.findByEmail(email);
		int buyer = tUser.getUserNo(); // 판매자 정보
		try {
			List<Trade> sList = tr.findAllBybUserUserNo(buyer);
			if (sList.size() == 0)
				return new ResultMap<Object>("SUCCESS", "구매한 내역이 없습니다.", null);
			return new ResultMap<Object>("SUCCESS", "구매한 목록 조회 완료", sList);
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