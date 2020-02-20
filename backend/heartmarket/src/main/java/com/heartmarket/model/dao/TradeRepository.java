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
import com.heartmarket.model.dto.User;
import com.heartmarket.model.dto.response.OtherTrade;

@Repository
public interface TradeRepository extends JpaRepository<Trade, Integer> {

	// 거래글 하나를 조회 ( 상세 페이지 조회 )
	// 메인페이지에서 게시글 하나를 선택 했을 때 사용
	Trade findByTradeNo(Integer tradeNo);
	
	List<Trade> findAllByTradeArea(String tradeArea);
	
	List<Trade> findAllBytUserUserNo(int userNo);
	List<Trade> findAllBytUserUserNoOrderByTradeNoDesc(int userNo);

	List<Trade> findAllBybUserUserNo(int userNo);
	
	// 검색 결과
//	List<TradeResponse> findAllBy();
	
	Page<Trade> findAllByTradeAreaAndTradeCategory(String tradeArea, String tradeCategory, Pageable req);
	Page<Trade> findAllByTradeCategory(String tradeCategory, Pageable req);
	Page<Trade> findAllByTradeAreaAndTradeCategoryAndBUserUserNoIsNull(String tradeArea, String tradeCategory, Pageable req);
	Page<Trade> findAllByTradeAreaAndTradeCategoryAndBUserUserNoIsNotNull(String tradeArea, String tradeCategory, Pageable req);

	// 페이지  기능
	// 가져 옵시다. 구매 목록, 판매 목록

	// 페이지 기능 -> 검색 기능
	// 현재 데이터 수
	// 지역별 데이터 수
	Integer countByTradeArea(String area);
	
	@Query("Select count(t) from Trade t")
	int  countAll();

	// getList에서 사용되는 전체 조회
	Page<Trade> findAll(Pageable req);
	// 판매중
	Page<Trade> findBybUserUserNoIsNull(Pageable req);
	Page<Trade> findBybUserUserNoIsNotNull(Pageable req);
	
	Page<Trade> findByTradeArea(String area,Pageable req);

	Page<Trade> findAll(Specification<Trade> specification, Pageable of);
	

	// 판매내역 일부만가져오기 --> 상대방 프로필에 띄울거
	List<Trade> findTop4BytUserUserNo(int userNo);
	
	// 인기매물 ( 찜한 순서대로 )
	@Query("select t from Cart c right join Trade t on c.cTrade.tradeNo = t.tradeNo"
			+ " and t.bUser.userNo is null"
			+ " group by t.tradeNo "
			+ " having count(c.cTrade.tradeNo) > 0"
			+ "order by count(c.cTrade.tradeNo) desc"
			)
	Page<Trade> findTop8All(Pageable req);
	
}
