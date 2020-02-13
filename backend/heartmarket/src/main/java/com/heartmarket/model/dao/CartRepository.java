package com.heartmarket.model.dao;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Cart;
@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
	
	@Query("Select c from Cart c where c.cUser.userNo=?1 and c.cTrade.tradeNo=?2")
	public Cart findBycUserUserNoAndcTradeTradeNo(int userNo,int tradeNo);
	public List<Cart> findAllBycUserUserNo(int userNo);
	
	public List<Cart> findAll(Specification<Cart> specification);
	
	public Cart findBycTradeTradeNo(int tradeNo);
	
	@Query("select c from Cart c where c.cTrade.tradeNo=?1 and c.cUser.userNo=?2")
	public Cart findBycTradeTradeNoAndcUserUserNo(int tradeNo, int userNo);
}
