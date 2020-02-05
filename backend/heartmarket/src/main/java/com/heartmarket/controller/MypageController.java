package com.heartmarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.service.MypageService;
import com.heartmarket.model.service.TradeService;
import com.heartmarket.model.service.UserService;

@RestController
@CrossOrigin("*")
public class MypageController {
	
	@Autowired
	MypageService ms;
	
	// 판매 내역을 확인
	@RequestMapping(value = "/mypage/sell", method = RequestMethod.GET)
	public ResponseEntity<Object> findSellList(@RequestParam String email){
		return new ResponseEntity<Object>(ms.getSellList(email), HttpStatus.OK);
	}
	
	// 구매 내역을 확인
	@RequestMapping(value = "/mypage/buy", method = RequestMethod.GET)
	public ResponseEntity<Object> findBuyList(@RequestParam String email){
		return new ResponseEntity<Object>(ms.getBuyList(email), HttpStatus.OK);
	}
	
	
	
}
