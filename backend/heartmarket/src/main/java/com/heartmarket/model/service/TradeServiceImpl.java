package com.heartmarket.model.service;

import org.springframework.data.domain.Pageable;
import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.response.TradeMapping;
import com.heartmarket.model.dto.response.TradeResponse;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiOperation;

@Service
public class TradeServiceImpl implements TradeService{

	@Autowired
	TradeRepository tr;
	
	@Autowired
	TradeImgRepository tir;

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
	public ResultMap<Integer> addTrade(Trade trade) {
		try {
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
	public List<TradeMapping> getList(){

		List<TradeResponse> trList = tr.findAllBy();
		List<TradeMapping> tmList = new ArrayList<>();
		
		for (TradeResponse res : trList) {
			tmList.add(new TradeMapping(
					res.getTradeNo(),
					res.getTradeTitle(),
					res.getTradeArea(),
					res.getProductPrice(),
					res.getTUser().getNickname(),
					tir.findAllBytiTradeTradeNo(res.getTradeNo())));
		}
		return tmList;
	}

	@Override
	// size 만큼 가져오기 (전체 목록)
	public Page<TradeResponse> fetPages(int no, int size){
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		return tr.findByTradeNoLessThan(no, pr);
	}
	
	// 사용자가 설정한 지역을 기준으로 페이징
	@Override
	public Page<TradeResponse> fetPages(int no, int size, String area){
		List<Trade> tList = tr.findAllByTradeArea(area);
		int cnt = tList.get(tList.size()-1).getTradeNo() ;
		System.out.println(tList.size());
		System.out.println("no : "+ no);
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		if(no == 0) no = cnt;
		System.out.println("cnt : " + cnt);
		System.out.println(no+1);
		return tr.findByTradeNoLessThanAndTradeArea(no, area, pr);
	}
	
	// 사용자가 설정한 지역을 기준으로 카테고리를 선택했을 때, 페이징
	@Override
	public Page<TradeResponse> fetPageAC(int no, int size, String area, String category){
		List<Trade> tList = tr.findAllByTradeArea(area);
		System.out.println("t : " + tList.size());
		System.out.println("no : "+ no);
		if(tList.size() == 0) return null;
		int cnt = tList.get(tList.size()-1).getTradeNo();
		
		PageRequest pr = PageRequest.of(0, size, Sort.by("tradeNo").descending());
		if(no == 0) no = cnt;
		return tr.findByTradeNoLessThanAndTradeAreaAndTradeCategory(no, area, category, pr);
	}
	
}
