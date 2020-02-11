package com.heartmarket.model.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.response.TradeMapping;
import com.heartmarket.model.dto.response.TradeResponse;
import com.heartmarket.util.ResultMap;

public interface TradeService {

	public List<Trade> findAll() ;
	public Trade findOne(int tradeNo);
	public List<Trade> findAllByAddr(String address);
	public ResultMap<Integer> addTrade(Trade trade);
	public ResultMap<Object> updateTrade(Trade trade);
	public ResultMap<Object> deleteTrade(int no) ;
	
	public List<TradeMapping> getList();
	Page<TradeResponse> fetPages(int no, int size);
	public Page<TradeResponse> fetPages(int no, int size, String area);
	public Page<TradeResponse> fetPageAC(int no, int size, String area,  String category);
}
