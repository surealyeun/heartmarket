package com.heartmarket.model.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.model.dto.response.TradeDetail;
import com.heartmarket.util.ResultMap;

public interface TradeService {

	public List<Trade> findAll() ;
//	public Trade findOne(int tradeNo);
	public TradeDetail findDetailByEmail(int tradeNo, int userNo);
	public Trade findDetail(int tradeNo);
	public List<Trade> findAllByAddr(String address);
	public ResultMap<Integer> addTrade(Trade trade,List<TradeImg> fList,int userNo);
	public ResultMap<Object> updateTrade(Trade trade);
	public ResultMap<Object> deleteTrade(int no) ;
	
	Page<Trade> getList(int no, int size);
	Page<Trade> fetPages(int no, int size);
	public Page<Trade> fetPages(int no, int size, String area);
	public Page<Trade> fetPageAC(int no, int size, String area,  String category);
	public Page<Trade> fetPageTP(int no, int size, List<String> sList, String area);

	ResultMap<Trade> findByCompleteTrade(int bUserNo, String other, int tradeNo);
	Page<Trade> findByTradeType(int no, int size, int type, int userno);
}
