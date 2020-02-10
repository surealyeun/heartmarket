package com.heartmarket.model.service;

import com.heartmarket.util.ResultMap;

public interface MypageService {

	// My Page 관련 비즈니스 로직
	// 판매 내역 조회
	public ResultMap<Object> getSellList(String email);
	// 구매 내역 조회
	public ResultMap<Object> getBuyList(String email);
	
}
