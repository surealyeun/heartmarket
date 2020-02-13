package com.heartmarket.model.dto.response;

import java.util.List;

import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.model.dto.User;

// 검색 결과 표시를 위한 response
public interface TradeResponse {

	Integer getTradeNo();
	String getTradeTitle();
	String getProductPrice();
	String getTradeArea();
	
	User getTUser();
//	List<TradeImg> getTTradeImg();
}
