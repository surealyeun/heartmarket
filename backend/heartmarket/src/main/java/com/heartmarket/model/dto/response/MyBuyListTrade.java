package com.heartmarket.model.dto.response;

import java.util.List;

import javax.persistence.Column;

import com.heartmarket.model.dto.TradeImg;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyBuyListTrade {

	Integer tradeNo;

	String tradeCategory;
	String tradeTitle;
	String tradeArea;
	String productInfo;
	int productPrice;
	String tradeDate;
	int tUser;
	int bUser;
	List<TradeImg> tTradeImg;
}
