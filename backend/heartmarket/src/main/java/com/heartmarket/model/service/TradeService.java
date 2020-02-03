package com.heartmarket.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dto.Trade;

@Service
public class TradeService {

	@Autowired
	TradeRepository tr;
	
	// 모든 자료 조회
	public List<Trade> findAll(){
		return tr.findAll();
	}
	
	// 상세 페이지 조회
	public Trade findOne(int tradeNo) {
		return tr.findByTradeNo(tradeNo);
	}
}
