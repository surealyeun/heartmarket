package com.heartmarket.model.service;

import java.util.List;

import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.util.ResultMap;

public interface TradeService {

	public List<Trade> findAll() ;
	public Trade findOne(int tradeNo);
	public List<Trade> findAllByAddr(String address);
	public ResultMap<Integer> addTrade(Trade trade,List<TradeImg> fList,int userNo);
	public ResultMap<Object> updateTrade(Trade trade);
	public ResultMap<Object> deleteTrade(int no) ;
}
