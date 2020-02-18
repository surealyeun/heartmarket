package com.heartmarket.model.dto.response;

import com.heartmarket.model.dto.Trade;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TradeDetail {

	// 게시글 정보
	Trade trade;
	// 매너 지수
	double heartguage;
	// 찜 여부
	int cno;
	
	// 거래 완료 됬으면 완료됬는지 아닌지 여부
	int complete;
}
