package com.heartmarket.model.service;

import java.util.List;

import com.heartmarket.model.dto.Cart;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;

public interface CartService {
	public void insert(int userNo,int tradeNo);
	public void delete(int userNo,int tradeNo);
	public List<Cart> searchAll(int userNo);
	public boolean duplicateCart(int userNo,int tradeNo);
	Cart findOne(String email, int tradeNo);
}
