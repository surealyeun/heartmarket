package com.heartmarket.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.dto.Cart;
import com.heartmarket.model.dto.response.CartMapping;
import com.heartmarket.model.service.CartService;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class CartController {

	@Autowired
	CartService cs;
	
	ResultMap result;
	
	@RequestMapping(value = "/cart",method = RequestMethod.GET)
	@ApiOperation(value = "찜 기능 구현 API 존재여부에 따라 등록 및 삭제")
	public ResultMap<String> Cart(HttpServletRequest request,@RequestParam int userNo,@RequestParam int tradeNo) {
		if(!cs.duplicateCart(userNo, tradeNo)) {
			cs.insert(userNo, tradeNo);
			result = new ResultMap<String>("OK","insert SUCESS","장바구니 추가 완료");
		}else {
			cs.delete(userNo, tradeNo);
			result = new ResultMap<String>("OK","delete SUCESS","장바구니 삭제 완료");
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
	
	// 거래 번호로 찾기
//	@ApiOperation(value = "현재 로그인하고 있는 유저 기준으로 게시글 찜 여부 확인")
//	@RequestMapping(value = "/cart/search/{tradeNo}", method = RequestMethod.GET)
//	public ResponseEntity<Object> searchCart(@PathVariable int tradeNo, @RequestParam String email){
//		if(!email.equals("none")) {
//			List<Cart> cCart = cs.findOne(email, tradeNo);
//			System.out.println(cCart.size());
//			return new ResponseEntity<Object>(new ResultMap<CartMapping>("SUCCESS", "찜했어요",new CartMapping(cCart.get(0).getCartNo(), cCart.get(0).getCUser().getUserNo(), cCart.get(0).getCTrade().getTradeNo())), HttpStatus.OK);
//		}
//		return new ResponseEntity<Object>(new ResultMap<Object>("FAIL", "로그인이 안되있어요", null), HttpStatus.NOT_FOUND);
//
//	}
}
