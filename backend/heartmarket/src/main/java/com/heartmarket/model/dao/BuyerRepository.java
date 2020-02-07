package com.heartmarket.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.heartmarket.model.dto.Buyer;

public interface BuyerRepository extends JpaRepository<Buyer, Integer> {

}
