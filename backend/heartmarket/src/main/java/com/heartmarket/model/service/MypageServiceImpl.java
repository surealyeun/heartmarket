package com.heartmarket.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.base.Optional;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;
import com.heartmarket.util.ResultMap;

@Service
public class MypageServiceImpl implements MypageService {

	@Autowired
	UserRepository ur;

	@Autowired
	TradeRepository tr;

	// 판매 내역 조회
	@Override
	public ResultMap<Object> getSellList(String email) {
		User tUser = ur.findByEmail(email);
		int seller = tUser.getUserNo(); // 판매자 정보
		try {
			List<Trade> sList = tr.findAllBytUserUserNo(seller);
			if(sList.size() == 0) return new ResultMap<Object>("SUCCESS", "판매한 내역이 없습니다.", null);
			return new ResultMap<Object>("SUCCESS", "판매한 목록 조회 완료", sList);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public ResultMap<Object> getBuyList(String email) {
		User tUser = ur.findByEmail(email);
		int buyer = tUser.getUserNo(); // 판매자 정보
		try {
			List<Trade> sList = tr.findAllBybUserUserNo(buyer);
			if(sList.size() == 0) return new ResultMap<Object>("SUCCESS", "구매한 내역이 없습니다.", null);
			return new ResultMap<Object>("SUCCESS", "구매한 목록 조회 완료", sList);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}
