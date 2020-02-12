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
	public void insert(int userNo,int tradeNo) {
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
	public void delete(int userNo,int tradeNo) {
		try {
			Cart cart = cr.findBycUserUserNoAndcTradeTradeNo(userNo,tradeNo);
			cr.deleteById(cart.getCartNo());
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public List<Cart> searchAll(int userNo) {
		try {
			List<Cart> carts = cr.findAllBycUserUserNo(userNo);
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
			if(cart!=null) return true;
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	// 카트 찜여부 확인
	@Override
	public Cart findOne(String email, int tradeNo) {
		System.out.println(email);
		System.out.println(tradeNo);
		return cr.findBycTradeTradeNo(new Specification<Cart>() {
			
			@Override
			public Predicate toPredicate(Root<Cart> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
				List<Predicate> predicates = new ArrayList<Predicate>();
				// email ""-> 로그인 안한 상태
				if(!email.equals("")) {
					User u = ur.findByEmail(email);
					predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("cUser"), u.getUserNo())));
					predicates.add(criteriaBuilder.and(criteriaBuilder.equal(root.get("cTradeNo"), tradeNo)));
					return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
				}
				return null;
			}
		});
	}

}
