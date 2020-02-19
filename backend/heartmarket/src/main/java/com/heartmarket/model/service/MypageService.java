package com.heartmarket.model.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dto.response.OtherResponse;
import com.heartmarket.model.dto.response.OtherTrade;
import com.heartmarket.util.ResultMap;

@Service
public interface MypageService {

	// My Page 관련 비즈니스 로직
	// 판매 내역 조회
	public ResultMap<Object> getSellList(String email);
	// 구매 내역 조회
	public ResultMap<Object> getBuyList(String email);

	// 상대방 프로필을 가져옵니다.
	OtherResponse findOther(int userNo);
	
	//리스트 가져옵니다.
	public List<OtherTrade> findAllByTrade(int no, int userNo);
	List<OtherTrade> findAllByOther2( int userNo);
	
}
