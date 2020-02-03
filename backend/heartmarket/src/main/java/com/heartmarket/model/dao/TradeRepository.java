package com.heartmarket.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Trade;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

	// 거래글 하나를 조회 ( 상세 페이지 조회 )
	// 메인페이지에서 게시글 하나를 선택 했을 때 사용
	Trade findByTradeNo(Integer tradeNo);
	
	
}
