package com.heartmarket.controller;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;
import com.heartmarket.model.service.TradeService;
import com.heartmarket.model.service.TradeServiceImpl;
import com.heartmarket.model.service.UserService;
import com.heartmarket.util.ResultMap;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
public class TradeController {
	// 거래 게시글 관련 된 모든 기능
	
	@Autowired
	TradeService ts;
	
	@Autowired
	UserService us;

	
	// 게시글 전체 목록 조회 & 지역 기반으로 조회
	@RequestMapping(value = "/trade/list", method = RequestMethod.GET)
	public ResponseEntity<Object> findAll(@RequestParam String email){
		
		// 유저 지역 정보 가져오기
		User tUser = us.searchEmail(email);
		
		if(tUser == null) {
			return new ResponseEntity<Object>(new ResultMap<Trade>("SUCCESS", "현재 지역에 상품이 없어요 ㅠㅠ", null), HttpStatus.OK);
		}else {
			String location = new String();
			List<Trade> tList = new ArrayList<Trade>();
			for (int i = 0; i < tUser.getUArea().size(); i++) {
				String pArea = tUser.getUArea().get(i).getAddress();
				location += pArea+",";
				tList.addAll(ts.findAllByAddr(pArea));
			}
			return new ResponseEntity<Object>(new ResultMap<List<Trade>>("SUCCESS", location +  "에 해당하는 게시글 조회 완료", tList), HttpStatus.OK);
		}
	}
	
	// 게시글 1개만 조회
	@RequestMapping(value = "/trade/{no}", method = RequestMethod.GET)
	@ApiOperation(value = "게시글 1개만 조회")
	public ResponseEntity<Object > findOne(@PathVariable int no){
//		Trade tmp = ts.findOne(no);
		return new ResponseEntity<Object>(ts.findOne(no), HttpStatus.OK);
	}
	
	// 게시글 추가
	@ApiOperation(value = "게시글 추가")
	@RequestMapping(value = "/trade/add", method = RequestMethod.POST)
	public ResponseEntity<Object> addTrade(@RequestBody Trade trade){
		return new ResponseEntity<Object>(ts.addTrade(trade), HttpStatus.OK);
	}
	
	// 게시글 삭제
	@ApiOperation(value = "게시글 삭제")
	@RequestMapping(value = "/trade/delete/{no}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> delTrade(@PathVariable int no){
		return new ResponseEntity<Object>(ts.deleteTrade(no), HttpStatus.OK); 
	}
	
	// 게시글 수정
	@ApiOperation(value = "게시글 수정")
	@RequestMapping(value = "/trade/update", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateTrade(@RequestBody Trade trade){
		return new ResponseEntity<Object>(ts.updateTrade(trade), HttpStatus.OK);
	}
	
	
}
