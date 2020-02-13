package com.heartmarket.model.service;

import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;

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

import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.model.dto.User;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiOperation;

@Service
public class TradeServiceImpl implements TradeService{

	@Autowired
	TradeRepository tr;
	
	@Autowired
	TradeImgRepository tir;
	
	@Autowired
	UserRepository ur;
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
	@Transactional
	public Trade findOne(int tradeNo) {
		return tr.findByTradeNo(tradeNo);
	}

	// 게시글 추가
	@Transactional
	public ResultMap<Integer> addTrade(Trade trade,List<TradeImg> fList,int userNo) {
		try {
			User user = ur.findByUserNo(userNo);
			System.out.println("유우저 :" + user.getUserNo());
			System.out.println("트레이드 :" + trade.toString());
			for (TradeImg tradeImg : fList) {
				tradeImg.setTiTrade(trade);
			}
			trade.setTUser(user);
			trade.setTTradeImg(fList);
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
	public Page<Trade> getList(int no, int size){
		List<Trade> tList = tr.findAll();
		int cnt = tList.get(tList.size()-1).getTradeNo() ;
		if(no == 0) no = cnt;
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		return tr.findByTradeNoLessThan(no, pr);
	}

	@Override
	// size 만큼 가져오기 (전체 목록)
	public Page<Trade> fetPages(int no, int size){
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		return tr.findByTradeNoLessThan(no, pr);
	}
	
	// 사용자가 설정한 지역을 기준으로 페이징
	@Override
	public Page<Trade> fetPages(int no, int size, String area){
		List<Trade> tList = tr.findAllByTradeArea(area);
		int cnt = tList.get(tList.size()-1).getTradeNo() ;
		System.out.println("size : " + tList.size());
		System.out.println("cnt : " + cnt);
		System.out.println("no : "+ no);
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		if(no == 0) no = cnt+1;
		System.out.println("cnt : " + cnt);
		System.out.println(no);
		return tr.findByTradeNoLessThanAndTradeArea(no, area, pr);
	}
	
	// 사용자가 설정한 지역을 기준으로 카테고리를 선택했을 때, 페이징
	@Override
	public Page<Trade> fetPageAC(int no, int size, String area, String category){
		List<Trade> tList = tr.findAllByTradeArea(area);
		System.out.println("t : " + tList.size());
		System.out.println("no : "+ no);
		if(tList.size() == 0) return null;
		int cnt = tList.get(tList.size()-1).getTradeNo();
		
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		if(no == 0) no = cnt;
		return tr.findByTradeNoLessThanAndTradeAreaAndTradeCategory(no, area, category, pr);
	}

	@Override
	// 검색했을 때, 결과 불러오기
	public Page<Trade> fetPageTP(int no, int size, List<String> sList, String area) {
		// 둘 중 하나 입니당....
		// 로그인을 안 했을 때,
//		if()
		
		// 로그인을 했을 때,
		List<Trade> tList = tr.findAllByTradeArea(area);
		int cnt = tList.get(tList.size()-1).getTradeNo() ;
		
		return tr.findAll(new Specification<Trade>() {

			@Override
			public Predicate toPredicate(Root<Trade> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				for (String str : sList) {
					System.out.println(str);
					predicates.add(criteriaBuilder.or(criteriaBuilder.like(root.get("tradeTitle"), "%"+str+"%"),
							criteriaBuilder.like(root.get("productInfo"), "%"+str+"%"))
							);
				}
				System.out.println("area : " + area);
				if(!area.equals("none"))
					predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("tradeArea"), area)));
				if(no != 0) {
					predicates.add(criteriaBuilder.and(criteriaBuilder.lessThan(root.get("tradeNo"), no)));
				}else {
					predicates.add(criteriaBuilder.and(criteriaBuilder.lessThan(root.get("tradeNo"), cnt)));
				}
			System.out.println(predicates.size());
			System.out.println(predicates.get(0).toString());
				return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
			}
			
		}, PageRequest.of(0, size, Sort.by("tradeNo").descending()));
	}
	
}
