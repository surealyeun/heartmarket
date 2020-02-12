package com.heartmarket.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.ctc.wstx.shaded.msv_core.util.Uri;
import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.model.dto.User;
import com.heartmarket.model.dto.response.TradeMapping;
import com.heartmarket.model.dto.response.TradeResponse;
import com.heartmarket.model.service.ImgService;
import com.heartmarket.model.service.MannerService;
import com.heartmarket.model.service.TradeService;
import com.heartmarket.model.service.TradeServiceImpl;
import com.heartmarket.model.service.UserService;
import com.heartmarket.util.ResultMap;
import com.heartmarket.util.SearchUtils;
import com.heartmarket.util.UploadFileUtils;

import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@CrossOrigin("*")
public class TradeController {
	// 거래 게시글 관련 된 모든 기능

	@Autowired
	TradeService ts;

	@Autowired
	UserService us;
	
	@Autowired
	ImgService is;
	
	private ResultMap<List<TradeImg>> rms;

	@Autowired
	MannerService ms;
	
	@Autowired
	TradeImgRepository tr;

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

	// 지역별 게시글 현황
	@RequestMapping(value = "/trade/area/search/{area}", method = RequestMethod.GET)
	@ApiOperation(value =  "지역별 게시글 현황")
	public ResponseEntity<Object> findByArea(@PathVariable String area){
		return new ResponseEntity<Object>(new ResultMap<TradeResponse>("SUCCESS", area + "지역 게시글", null), HttpStatus.OK);
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
	public ResponseEntity<Object> addTrade(
			@RequestParam String tradeTitle,@RequestParam String tradeCategory,
			@RequestParam String productPrice,@RequestParam String userNo,
			@RequestParam String tradeArea,@RequestParam String productInfo,@RequestParam MultipartFile[] files) throws Exception{
		Date date = new Date();
		SimpleDateFormat transeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String time = transeFormat.format(date);
		int uNo = Integer.parseInt(userNo);
		Trade trade = new Trade(tradeCategory, tradeTitle,tradeArea, productInfo, productPrice, time);
		String imgUploadPath = File.separator + "home"+File.separator+"ubuntu";
		for (MultipartFile multipartFile : files) {
			System.out.println("files : " + multipartFile);
		}
		rms = is.uploadFiles(files,imgUploadPath,"trade");
		if(rms.getData() != null) {
			List<TradeImg> fList = rms.getData();
			ts.addTrade(trade,fList,uNo);
			return new ResponseEntity<Object>(rms, HttpStatus.OK);
		}else {
			return new ResponseEntity<Object>(rms,HttpStatus.NOT_ACCEPTABLE);
		}
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
	
	// 거래 완료
	// 거래 완료는 판매자가 구매자를 확정시켰을 때만 완료이다.
//	@RequestMapping(value = "/trade/complete", method = )
//	public ResponseEntity<Object> completeTrade(){
//		// 거래 완료
//		
//	}

	// 매너 평가
	// 거래가 완료되었을 때만, 평가를 할 수 있다.
	// 평가는 Trade 테이블의 true/false 를 
	@RequestMapping(value = "/manner", method = RequestMethod.POST)
	public ResponseEntity<Object> evalManner(@RequestParam int val, @RequestParam int userNo) {
		return new ResponseEntity<Object>(ms.evalueUser(val, userNo), HttpStatus.OK);
	}

	// 검색 결과 ( 필요한 항목만 )
	@RequestMapping(value = "/trade/search", method = RequestMethod.GET)
	@ApiOperation(value = "로그인 하지 않았을 경우, 전체 목록을 가져옴")
	public ResponseEntity<Object> getList(@RequestParam int no) {
		List<Trade> tList = ts.getList(no, 8).getContent();
		return new ResponseEntity<Object>(new ResultMap<List<TradeMapping>>("SUCCESS", "목록 불러오기 완료", mappedFor(tList)),
				HttpStatus.OK);
	}

	// 검색 결과 ( 필요한 항목만 => 모든 검색 페이징 기법 )
	@RequestMapping(value = "/trade/search2", method = RequestMethod.GET)
	public ResponseEntity<Object> getPageList(@RequestParam int no, @RequestParam int size) {
		List<Trade> rs = ts.fetPages(no, size).getContent();
		return new ResponseEntity<Object>(new ResultMap<Object>("success", "message", ts.fetPages(no, size)),
				HttpStatus.OK);
	}

	// 검색 결과 ( 사용자의 위치를 기준으로 => )
	@RequestMapping(value = "/trade/search/area", method = RequestMethod.GET)
	@ApiOperation(value = "사용자의 기본위치를 기반으로 검색")
	public ResponseEntity<Object> getPageAList(@RequestParam int no, @RequestParam String email) {
		String area = us.searchEmail(email).getUArea().get(0).getAddress();
		List<Trade> rs = ts.fetPages(no, 8, area).getContent();
		List<TradeMapping> tm = new ArrayList<TradeMapping>();
		tm = mappedFor(rs);
		return new ResponseEntity<Object>(new ResultMap<List<TradeMapping>>("SUCCESS", "검색 완료", tm), HttpStatus.OK);
	}

	// 검색 결과 ( 사용자의 위치를 기준으로 => )
	@RequestMapping(value = "/trade/search/area/{area}", method = RequestMethod.GET)
	@ApiOperation(value = "지역을 바꿀 때 마다 리셋")
	public ResponseEntity<Object> getPageAList2(@RequestParam int no, @PathVariable String area) {
		List<Trade> rs = ts.fetPages(no, 8, area).getContent();
		List<TradeMapping> tm = new ArrayList<TradeMapping>();
		tm = mappedFor(rs);
		return new ResponseEntity<Object>(new ResultMap<List<TradeMapping>>("SUCCESS", "검색 완료", tm), HttpStatus.OK);
	}

	// 검색 결과 ( 사용자의 위치를 기준으로 => 지역을 선택하고 => 카테고리를 선택 )
	@RequestMapping(value = "/trade/search/ac/{area}&{category}", method = RequestMethod.GET)
	@ApiOperation(value = "지역을 바꿀 때 마다, 카테고리를 바꿀 때  마다")
	public ResponseEntity<Object> getPageACList(@PathVariable(name = "area") String area,
			@PathVariable(name = "category") String category, @RequestParam int no) {
		List<Trade> rs = ts.fetPageAC(no, 3, area, category).getContent();
		System.out.println(rs.size());
		List<TradeMapping> tm = new ArrayList<TradeMapping>();
		tm = mappedFor(rs);
		return new ResponseEntity<Object>(new ResultMap<List<TradeMapping>>("SUCCESS", "검색 완료", tm), HttpStatus.OK);
	}

	// 검색 ( 키워드 2개 이상 / 단일 키워드 )
	@RequestMapping(value = "/trade/search/{keyword}", method = RequestMethod.GET)
	public ResponseEntity<Object> searchByKeyword(@PathVariable String keyword, @RequestParam(required = false) String email,
			@RequestParam int no) {

		// 입력받은 단어들을 받음
		List<String> sList = new ArrayList<>();
		SearchUtils s = new SearchUtils();
		sList = s.fetchKeyword(keyword);
		if (sList.size() == 0)
			return new ResponseEntity<Object>(new ResultMap<TradeMapping>("FAIL", "검색 불가", null), HttpStatus.OK);

		List<TradeMapping> tm = new ArrayList<TradeMapping>();
		System.out.println("email : " + email);
		// 현재 로그인이 안되있을 때,
		if (email.equals("none")) {
			tm = mappedFor(ts.fetPageTP(no, 8, sList, "none").getContent());
			return new ResponseEntity<Object>(new ResultMap<List<TradeMapping>>("SUCCESS", "성공?", tm), HttpStatus.OK);
			// 현재 로그인 완료
		} else {
			String area = us.searchEmail(email).getUArea().get(0).getAddress();
			tm = mappedFor(ts.fetPageTP(no, 8, sList, area).getContent());
			return new ResponseEntity<Object>(new ResultMap<List<TradeMapping>>("SUCCESS", "성공?", tm), HttpStatus.OK);

		}

	}

// 매핑 중...... C
	private List<TradeMapping> mappedFor(List<Trade> tList) {
		List<TradeMapping> tm = new ArrayList<TradeMapping>();
		User mUser = new User();
		String tmp = "";
		
		for (Trade trade : tList) {
			mUser = us.findByUser(trade.getTUser().getUserNo());
			tmp = tr.findAllBytiTradeTradeNo(trade.getTradeNo()).size() == 0 ? "none.png" : tr.findAllBytiTradeTradeNo(trade.getTradeNo()).get(0).getOrgImg();
			System.out.println("Userno : " + mUser.getUserNo());
			System.out.println(mUser.getProfileImg());
			System.out.println("tradeno ; " + trade.getTradeNo());
			tm.add(new TradeMapping(trade.getTradeNo(), trade.getTradeTitle(), trade.getTradeArea(),
					trade.getProductPrice(), trade.getTUser().getUserNo(), mUser.getProfileImg(),
					trade.getTUser().getNickname(), tmp ));
//			System.out.println("tradeorg: " + trade.getTTradeImg().get(0).getOrgImg());
			System.out.println();
		} 

		return tm;
	}
}
