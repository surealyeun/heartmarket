package com.heartmarket.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.TradeImg;

@Repository
public interface TradeImgRepository extends JpaRepository<TradeImg, Integer> {
	List<TradeImg> findAllBytiTradeTradeNo(int tradeNo);
}
