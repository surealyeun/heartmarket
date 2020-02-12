package com.heartmarket.model.dao;

import org.springframework.data.domain.Pageable;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
//	List<TradeResponse> findAllBy();
	
	// 페이지  기능
	Page<Trade> findByTradeNoLessThan(int tradeNo, Pageable req);
	Page<Trade> findByTradeNoLessThanAndTradeArea(int tradeNo, String area, Pageable req);
	Page<Trade> findByTradeNoLessThanAndTradeAreaAndTradeCategory(int tradeNo, String tradeArea, String tradeCategory, Pageable req);

	// 페이지 기능 -> 검색 기능
	// 1. 모든 리스트를 불러오고 검색어를 기준으로 다시 처리
//	Page<Trade> findByTradeNoLessThanAndTradeTitleContainingAndProductInfoContaining(int tradeNo, 
//			String tradeTitle, String productInfo, Pageable req);
//	@Query("select * from trade t where t.trade_title like %:str% and t.product_info like %:str%")
//	List<Trade> findByKeywords(@Param(value = "str") String keyword);
	
	
	// 현재 데이터 수
	// 지역별 데이터 수
	Integer countByTradeArea(String area);

	// 검색어  입력시 검색 결과를 불러오는 내용
	Page<Trade> findAll(Specification<Trade> specification, Pageable req);
}
