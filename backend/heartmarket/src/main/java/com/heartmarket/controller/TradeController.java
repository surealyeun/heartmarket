package com.heartmarket.controller;

import java.util.ArrayList;

import java.util.List;

import javax.websocket.server.PathParam;

import org.apache.commons.io.IOUtils;
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
import com.heartmarket.model.dto.response.TradeResponse;
import com.heartmarket.model.service.MannerService;
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

	@Autowired
	MannerService ms;

	// 게시글 전체 목록 조회 & 지역 기반으로 조회
	@RequestMapping(value = "/trade/list", method = RequestMethod.GET)
	public ResponseEntity<Object> findAll(@RequestParam String email) {

		// 유저 지역 정보 가져오기
		User tUser = us.searchEmail(email);
		if (tUser == null) {
			return new ResponseEntity<Object>(new ResultMap<Trade>("SUCCESS", "현재 지역에 상품이 없어요 ㅠㅠ", null),
					HttpStatus.OK);
		} else {
			String location = new String();
			List<Trade> tList = new ArrayList<Trade>();
			for (int i = 0; i < tUser.getUArea().size(); i++) {
				String pArea = tUser.getUArea().get(i).getAddress();
				location += pArea + ",";
				tList.addAll(ts.findAllByAddr(pArea));
			}
			return new ResponseEntity<Object>(
					new ResultMap<List<Trade>>("SUCCESS", location + "에 해당하는 게시글 조회 완료", tList), HttpStatus.OK);
		}
	}

	// 게시글 1개만 조회
	@RequestMapping(value = "/trade/{no}", method = RequestMethod.GET)
	@ApiOperation(value = "게시글 1개만 조회")
	public ResponseEntity<Object> findOne(@PathVariable int no) {
//		Trade tmp = ts.findOne(no);
		return new ResponseEntity<Object>(ts.findOne(no), HttpStatus.OK);
	}

	// 게시글 추가
	@ApiOperation(value = "게시글 추가")
	@RequestMapping(value = "/trade/add", method = RequestMethod.POST)
	public ResponseEntity<Object> addTrade(@RequestBody Trade trade) {
		return new ResponseEntity<Object>(ts.addTrade(trade), HttpStatus.OK);
	}

	// 게시글 삭제
	@ApiOperation(value = "게시글 삭제")
	@RequestMapping(value = "/trade/delete/{no}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> delTrade(@PathVariable int no) {
		return new ResponseEntity<Object>(ts.deleteTrade(no), HttpStatus.OK);
	}

	// 게시글 수정
	@ApiOperation(value = "게시글 수정")
	@RequestMapping(value = "/trade/update", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateTrade(@RequestBody Trade trade) {
		return new ResponseEntity<Object>(ts.updateTrade(trade), HttpStatus.OK);
	}

	// 매너 평가
	@RequestMapping(value = "/manner", method = RequestMethod.POST)
	public ResponseEntity<Object> evalManner(@RequestParam int val, @RequestParam int userNo) {
		return new ResponseEntity<Object>(ms.evalueUser(val, userNo), HttpStatus.OK);
	}

	// 검색 결과 ( 필요한 항목만 )
	@RequestMapping(value = "/trade/search", method = RequestMethod.GET)
	public ResponseEntity<Object> getList() {
		return new ResponseEntity<Object>(ts.getList(), HttpStatus.OK);
	}

	// 검색 결과 ( 필요한 항목만 => 모든 검색 페이징 기법 )
	@RequestMapping(value = "/trade/search2", method = RequestMethod.GET)
	public ResponseEntity<Object> getPageList(@RequestParam int no, @RequestParam int size) {
		List<TradeResponse> rs = ts.fetPages(no+1, size).getContent();
		return new ResponseEntity<Object>(
				new ResultMap<Object>("success", "message", ts.fetPages(no, size)),
				HttpStatus.OK);
	}

	// 검색 결과 ( 사용자의 위치를 기준으로 => )
	@RequestMapping(value = "/trade/search/area", method = RequestMethod.GET)
	@ApiOperation(value = "사용자의 기본위치를 기반으로 검색")
	public ResponseEntity<Object> getPageAList(@RequestParam int no, @RequestParam String email) {
		String area = us.searchEmail(email).getUArea().get(0).getAddress();
		List<TradeResponse> rs = ts.fetPages(no, 8, area).getContent();
		return new ResponseEntity<Object>(new ResultMap<List<TradeResponse>>("SUCCESS", "검색 완료", rs), HttpStatus.OK);
	}

	// 검색 결과 ( 사용자의 위치를 기준으로 => )
	@RequestMapping(value = "/trade/search/area/{area}", method = RequestMethod.GET)
	@ApiOperation(value = "지역을 바꿀 때 마다 리셋")
	public ResponseEntity<Object> getPageAList2(@RequestParam int no, @PathVariable String area) {
		List<TradeResponse> rs = ts.fetPages(no, 3, area).getContent();
		return new ResponseEntity<Object>(new ResultMap<List<TradeResponse>>("SUCCESS", "검색 완료", rs), HttpStatus.OK);
	}
	
	// 검색 결과 ( 사용자의 위치를 기준으로 => 지역을 선택하고 => 카테고리를 선택 )
	@RequestMapping(value = "/trade/search/ac/{area}&{category}", method = RequestMethod.GET)
	@ApiOperation(value = "지역을 바꿀 때 마다, 카테고리를 바꿀 때  마다")
	public ResponseEntity<Object> getPageACList( 
			@PathVariable(name = "area") String area,
			@PathVariable(name = "category") String category,
			@RequestParam int no){
		List<TradeResponse> rs = ts.fetPageAC(no, 3, area, category).getContent();
		System.out.println(rs.size());
		return new ResponseEntity<Object>(new ResultMap<List<TradeResponse>>("SUCCESS", "검색 완료", rs), HttpStatus.OK);
	}
	
	// 검색 ( 키워드 2개 이상 / 단일 키워드 )
	@RequestMapping(value = "/trade/search/{keyword}" , method = RequestMethod.GET)
	public ResponseEntity<Object> searchByKeyword(@PathVariable String keyword){
		return null;
	}
}
