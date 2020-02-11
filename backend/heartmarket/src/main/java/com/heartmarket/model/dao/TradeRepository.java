package com.heartmarket.model.dao;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.response.TradeResponse;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

	// 거래글 하나를 조회 ( 상세 페이지 조회 )
	// 메인페이지에서 게시글 하나를 선택 했을 때 사용
	Trade findByTradeNo(Integer tradeNo);
	
	List<Trade> findAllByTradeArea(String tradeArea);
	
	List<Trade> findAllBytUserUserNo(int userNo);

	List<Trade> findAllBybUserUserNo(int userNo);
	
	// 검색 결과
	List<TradeResponse> findAllBy();
	
	// 페이지  기능
	Page<TradeResponse> findByTradeNoLessThan(int tradeNo, Pageable req);
	Page<TradeResponse> findByTradeNoLessThanAndTradeArea(int tradeNo, String area, Pageable req);
	Page<TradeResponse> findByTradeNoLessThanAndTradeAreaAndTradeCategory(int tradeNo, String tradeArea, String tradeCategory, Pageable req);
	
	// 현재 데이터 수
	// 지역별 데이터 수
	Integer countByTradeArea(String area);
}
