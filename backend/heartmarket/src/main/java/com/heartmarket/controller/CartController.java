package com.heartmarket.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.dto.Cart;
import com.heartmarket.model.service.CartService;
import com.heartmarket.util.ResultMap;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class CartController {

	@Autowired
	CartService cs;
	
	ResultMap result;
	
	@RequestMapping(value = "/cart/insert",method = RequestMethod.GET)
	public ResultMap<String> insertCart(HttpServletRequest request,@RequestParam int userNo,@RequestParam int tradeNo) {
		if(!cs.duplicateCart(userNo, tradeNo)) {
			cs.insert(userNo, tradeNo);
			result = new ResultMap<String>("OK","insert SUCESS","장바구니 추가 완료");
		}else {
			result = new ResultMap<String>("FAIL","insert FAIL","해당 상품이 해당유저에 장바구니에 이미 포함되어있습니다.");
		}
		return result;
	}
//	public ResponseEntity<Object> insertCart(HttpServletRequest request,@RequestParam int userNo,@RequestParam int tradeNo) {
//		if(!cs.duplicateCart(userNo, tradeNo)) {
//			cs.insert(userNo, tradeNo);
//			Cart tCart = cs.findOne(null, tradeNo);
//			result = new ResultMap<String>("OK","insert SUCESS","장바구니 추가 완료");
//		}else {
//			result = new ResponseEntity<Object>("FAIL","insert FAIL",);
//		}
//		return result;
//	}
	
	@RequestMapping(value = "/cart/delete",method = RequestMethod.GET)
	public ResultMap<String> delete(HttpServletRequest request,@RequestParam int userNo,@RequestParam int tradeNo) {
		if(cs.duplicateCart(userNo, tradeNo)) {
			cs.delete(userNo, tradeNo);
			result = new ResultMap<String>("OK","delete SUCESS","장바구니 삭제 완료");
		}else {
			result = new ResultMap<String>("FAIL","delete FAIL","해당 상품이 해당유저에 장바구니에 포함되어 있지 않습니다.");
		}
		return result;
	}
	
	@RequestMapping(value = "/cart/searchAll",method = RequestMethod.GET)
	public ResultMap<List<Cart>> searchAll(HttpServletRequest request, @RequestParam int userNo) {
		List<Cart> carts = cs.searchAll(userNo);
		if(carts.size()==0) {
			result = new ResultMap<List<Cart>>("FAIL","search FAIL",null);
		}else {
			result = new ResultMap<List<Cart>>("OK","search SUCESS",carts);
		}
		return result;
	}
	
	@RequestMapping(value = "/cart/search/{tradeNo}", method = RequestMethod.GET)
	public ResultMap<Object> searchCart(@PathVariable int tradeNo, @RequestParam String email){
		if(!email.equals("none")) {
			Cart cCart = cs.findOne(email, tradeNo);
			return new ResultMap<Object>("SUCCESS", "찜했어요", cCart);
		}
		return new ResultMap<Object>("FAIL", "로그인이 안되있어요", null);

	}
}
