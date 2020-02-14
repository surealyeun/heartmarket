package com.heartmarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.dto.response.OtherResponse;
import com.heartmarket.model.dto.response.OtherTrade;
import com.heartmarket.model.service.MypageService;
import com.heartmarket.model.service.TradeService;
import com.heartmarket.model.service.UserService;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiOperation;

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
	
	// 상대방 프로필 정보 가져오기
	@RequestMapping(value = "/mypage/{userno}", method = RequestMethod.GET)
	public ResponseEntity<Object> findByOther(@RequestParam int userno){
		OtherResponse tOther = ms.findOther(userno);
		return new ResponseEntity<Object>(new ResultMap<OtherResponse>("SUCCESS", "상대방 정보  불러오기성공", tOther), HttpStatus.OK);
	}
	
	// 더보기 버튼 누르면 판매내역 출력
	@ApiOperation(value = "더 보기 버튼을 누르면 판매내역 출력")
	@RequestMapping(value = "/mypage/detail/{userNo}", method = RequestMethod.GET)
	public ResponseEntity<Object> findAllByOther(@PathVariable int userNo, @RequestParam int no){
		return new ResponseEntity<Object>(new ResultMap<List<OtherTrade>>("SUCCESS", "전체 리스트 가져오기", ms.findAllByTrade(no, userNo)), HttpStatus.OK);
	}
	
	// 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가 평가
//	@ApiOperation(value = "/mypage/evalue/{tradeNo}")
//	@RequestMapping(value = )
	
}
