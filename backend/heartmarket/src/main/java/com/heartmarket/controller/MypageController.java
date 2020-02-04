package com.heartmarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.service.TradeService;
import com.heartmarket.model.service.UserService;

@RestController
@CrossOrigin("*")
public class MypageController {
	
	@Autowired
	TradeService ts;
	
	@Autowired
	UserService us;
	
	// 판매 내역을 확인
	@RequestMapping(value = "/mypage/sell", method = RequestMethod.GET)
	public ResponseEntity<Object> findSellList(@RequestParam String email){
		return null;
	}
	
	// 구매 내역을 확인
	
	
}
