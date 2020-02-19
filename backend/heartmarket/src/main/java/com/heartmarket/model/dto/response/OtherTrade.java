package com.heartmarket.model.dto.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

// 검색 결과 표시를 위한 response
@Getter
@AllArgsConstructor
public class OtherTrade {

	int tradeNo;
	String tTitle;
	String tArea;
	int pPrice;

	String uImg;

}
