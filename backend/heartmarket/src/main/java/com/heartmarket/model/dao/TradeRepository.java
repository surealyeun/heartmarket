package com.heartmarket.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.heartmarket.model.dto.Trade;

public interface TradeRepository extends JpaRepository<Trade, Integer> {

}
