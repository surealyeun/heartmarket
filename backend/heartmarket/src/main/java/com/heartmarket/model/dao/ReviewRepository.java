package com.heartmarket.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer>{
	
	// 가즈아!!!
	Review findByReviewNo(int no);
	
	@Query("Select r from Review r where trade_no = :tradeNo")
	Review findByrTradeTradeNo(int tradeNo);
}
