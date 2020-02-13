package com.heartmarket.model.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.CartRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Cart;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	CartRepository cr;
	@Autowired
	UserRepository ur;
	@Autowired
	TradeRepository tr;

	@Override
	public void insert(int userNo, int tradeNo) {
		try {
			User user = ur.findByUserNo(userNo);
			Trade trade = tr.findByTradeNo(tradeNo);
			Cart cart = new Cart();
			cart.setCUser(user);
			cart.setCTrade(trade);
			cr.save(cart);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void delete(int userNo, int tradeNo) {
		try {
			Cart cart = cr.findBycUserUserNoAndcTradeTradeNo(userNo, tradeNo);
			cr.deleteById(cart.getCartNo());
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public List<Cart> searchAll(int userNo) {
		try {
			List<Cart> carts = cr.findAllBycUserUserNoOrderByCartNoDesc(userNo);
			return carts;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public boolean duplicateCart(int userNo, int tradeNo) {
		try {
			Cart cart = cr.findBycUserUserNoAndcTradeTradeNo(userNo, tradeNo);
			if (cart != null)
				return true;
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	// 찜 목록
	@Override
	public List<Cart> findList(String email) {
		User u = ur.findByEmail(email);
		return cr.findAllBycUserUserNo(u.getUserNo());
	}

	// tradeNo로 cart 검색
	// email 은 로그인 한 유저
	@Override
	public Cart findByTradeNo(String email, int tradeNo) {
		User u = ur.findByEmail(email);
		return cr.findBycUserUserNoAndcTradeTradeNo(u.getUserNo(), tradeNo);
	}

}
