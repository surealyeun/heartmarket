package com.heartmarket.model.service;

import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.CartRepository;
import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Cart;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.model.dto.User;
import com.heartmarket.model.dto.response.TradeDetail;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiOperation;

@Service
public class TradeServiceImpl implements TradeService {

	@Autowired
	TradeRepository tr;

	@Autowired
	TradeImgRepository tir;

	@Autowired
	UserRepository ur;

	@Autowired
	CartRepository cr;
	
	// 모든 자료 조회
	@Transactional
	public List<Trade> findAll() {
		List<Trade> tList = tr.findAll();
		if (tList.size() == 0)
			return null;
		return tList;
	}

	// 지역별 게시글 조회
	@Transactional
	public List<Trade> findAllByAddr(String address) {
		List<Trade> aList = tr.findAllByTradeArea(address);
		if (aList.size() == 0)
			return null;
		return aList;
	}

	// 상세 페이지 조회
	// 로그인 안했을 때, 판매여부 확인
	@Transactional
	@Override
	public TradeDetail findDetail(int tradeNo) {
		try {
			if(Objects.isNull(tr.findByTradeNo(tradeNo).getBUser())) {
				return new TradeDetail(tr.findByTradeNo(tradeNo), 0, 0);				
			}else {
				return new TradeDetail(tr.findByTradeNo(tradeNo), 0, 1);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	// 로그인 되어있는 상태.
	// 찜 목록 표현
	// 거래 완료되었는지 아닌지 확인
	@Transactional
	@Override
	public TradeDetail findDetailByEmail(int tradeNo, int userNo) {
		try {
			// 게시글 정보를 가져오기
			Trade trade = tr.findByTradeNo(tradeNo);
			Cart cart = cr.findBycTradeTradeNoAndcUserUserNo(tradeNo, userNo);
			if(Objects.isNull(cart)) {
				return Objects.isNull(trade.getBUser()) ?
					new TradeDetail(trade, 0, 0) :  new TradeDetail(trade, 0, 1);
			}
			else {
				return Objects.isNull(trade.getBUser()) ?
						new TradeDetail(trade, 1, 0) :  new TradeDetail(trade, 1, 1);
			}
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}


	// 게시글 추가
	@Transactional
	public ResultMap<Integer> addTrade(Trade trade, List<TradeImg> fList, int userNo) {
		try {
			User user = ur.findByUserNo(userNo);
			System.out.println("유우저 :" + user.getUserNo());
			System.out.println("트레이드 :" + trade.toString());
			for (TradeImg tradeImg : fList) {
				tradeImg.setTiTrade(trade);
			}
			trade.setTUser(user);
			trade.settTradeImg(fList);
			tr.save(trade);
			return new ResultMap<Integer>("SUCCSS", "게시글 추가 완료", 1);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	// 게시글 수정
	@Transactional
	@ApiOperation(value = "게시글 수정")
	public ResultMap<Object> updateTrade(Trade trade) {
		try {
			Object obj = tr.save(trade);
			if (obj != null) {
				return new ResultMap<Object>("SUCCSS", "게시글 수정 완료", obj);
			} else {
				return new ResultMap<Object>("FAIL", "게시글 수정 실패", obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	// 게시글 삭제
	@Transactional
	public ResultMap<Object> deleteTrade(int no) {
		try {
			Trade trade = tr.findById(no).orElse(null);
			System.out.println(trade.toString());
			if (trade == null) {
				return new ResultMap<Object>("FAIL", "게시글 삭제 실패", null);
			}
			trade.setTUser(null);
			trade.setBUser(null);
			tr.delete(trade);
			return new ResultMap<Object>("SUCCESS", "게시글 삭제 성공", trade);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	// 서울시 전체 목록 가져오기
	@Override
	public Page<Trade> getList(int no, int size) {
		List<Trade> tList = tr.findAll();
		int cnt = tList.get(tList.size() - 1).getTradeNo();
		if (no == 0)
			no = cnt;
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		return tr.findByTradeNoLessThan(no, pr);
	}

	@Override
	// size 만큼 가져오기 (전체 목록)
	public Page<Trade> fetPages(int no, int size) {
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		return tr.findByTradeNoLessThan(no, pr);
	}

	// 사용자가 설정한 지역을 기준으로 페이징
	@Override
	public Page<Trade> fetPages(int no, int size, String area) {
		List<Trade> tList = tr.findAllByTradeArea(area);
		int cnt = tList.get(tList.size() - 1).getTradeNo();
		System.out.println("size : " + tList.size());
		System.out.println("cnt : " + cnt);
		System.out.println("no : " + no);
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());

		if (no == 0)
			no = cnt + 1;
		System.out.println("cnt : " + cnt);
		System.out.println(no);

		return tr.findByTradeNoLessThanAndTradeArea(no, area, pr);
	}

	// 사용자가 설정한 지역을 기준으로 카테고리를 선택했을 때, 페이징
	@Override
	public Page<Trade> fetPageAC(int no, int size, String area, String category) {
		List<Trade> tList = tr.findAllByTradeArea(area);
		System.out.println("t : " + tList.size());
		System.out.println("no : " + no);
		if (tList.size() == 0)
			return null;
		int cnt = tList.get(tList.size() - 1).getTradeNo();

		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		if (no == 0)
			no = cnt;
		return tr.findByTradeNoLessThanAndTradeAreaAndTradeCategory(no, area, category, pr);
	}

	@Override
	// 검색했을 때, 결과 불러오기
	public Page<Trade> fetPageTP(int no, int size, List<String> sList, String area) {
		// 둘 중 하나 입니당....
		// 로그인을 안 했을 때,
//		if()

		// 로그인을 했을 때,
		System.out.println("Area : " + area);
		List<Trade> tList = new ArrayList<Trade>();
		if (!area.equals("none"))
			tList = tr.findAllByTradeArea(area);
		else {
			tList = tr.findAll();
		}
//		int cnt = tList.get(tList.size() - 1).getTradeNo();
		int cnt = tr.countAll();
		System.out.println("cnt : " + cnt);
		System.out.println("size : " + tList.size());

		return tr.findAll(new Specification<Trade>() {

			@Override
			public Predicate toPredicate(Root<Trade> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				for (String str : sList) {
					System.out.println(str);
					predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("tradeTitle"), "%" + str + "%"),
							criteriaBuilder.like(root.get("productInfo"), "%" + str + "%")));
				}
				System.out.println("area : " + area);
				if (!area.equals("none"))
					predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("tradeArea"), area)));
				if (no != 0) {
					predicates.add(criteriaBuilder.and(criteriaBuilder.lessThan(root.get("tradeNo"), no)));
				} else {
					predicates.add(criteriaBuilder.and(criteriaBuilder.lessThan(root.get("tradeNo"), cnt)));
				}
				System.out.println(predicates.size());
				System.out.println(predicates.get(0).toString());
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}

		}, PageRequest.of(0, size, Sort.by("tradeNo").descending()));
	}

	@Override
	public ResultMap<Trade> findByCompleteTrade(int bUserNo, String other, int tradeNo) {
		Trade tmp = new Trade();
		try {
//			// 1. 현재 로그인 중인 유저의 기준으로 게시물을 가져옴.
			// 닉네임을 검색해야 합니다.
			User buyer = ur.findByNickname(other);
			// 2. 게시물에서 구매자 아이디가 null인지 확인
			Trade checkBuyer = tr.findByTradeNo(tradeNo);
			
			System.out.println(Objects.isNull(checkBuyer.getBUser()));
			if (Objects.isNull(checkBuyer.getBUser())) {
				// 3. null 이라면 구매자 아이디를 검색하여 확인 사살
				checkBuyer.setBUser(buyer);
				System.out.println(checkBuyer.toString());
				tr.save(checkBuyer);
				return new ResultMap<Trade>("SUCCESS", "거래 완료 확정", tmp);
			} else {
				// 2-1. null이 아니라면 거래가 완료된 게시글
				return new ResultMap<Trade>("FAIL", "거래가 완료된 글입니다.", null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public Page<Trade> findByTradeType(int no, int size, int type, int userno) {
		if (no == 0)
			no = tr.countAll();

		final int cnt = no;
		return tr.findAll(new Specification<Trade>() {

			@Override
			public Predicate toPredicate(Root<Trade> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<Predicate>();

				// 구매
				if (type == 1) {
					predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("bUser").get("userNo"), userno)));
					System.out.println(root.get("bUser").get("userNo").toString());
				}
				// 판매
				else if (type == 2) {
					predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("tUser").get("userNo"), userno)));
				}

				predicates.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get("tradeNo"), cnt)));
				System.out.println(predicates.size());
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}

		}, PageRequest.of(0, size, Sort.by("tradeNo").descending()));
	}
}
