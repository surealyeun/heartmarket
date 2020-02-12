package com.heartmarket.model.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
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

}
