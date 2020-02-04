package com.heartmarket.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.service.TradeService;
import com.heartmarket.util.ResultMap;

@RestController
@CrossOrigin("*")
public class TradeController {
	// 거래 게시글 관련 된 모든 기능
	
	@Autowired
	TradeService ts;
	
	@RequestMapping(value = "/trade/list", method = RequestMethod.GET)
	public ResponseEntity<Object> findAll(){
		
		List<Trade> tlist = ts.findAll();
		if(tlist == null) {
			
		}
		System.out.println(tlist.get(0).toString());
		return new ResponseEntity<Object>(tlist, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/trade/{no}", method = RequestMethod.GET)
	public ResultMap<Trade> getParameter(@PathVariable int no){
		Trade tmp = ts.findOne(no);
		return new ResultMap<Trade>("SUCCESS", no+"에 해당하는 게시글 불러오기", tmp);
	}
}
