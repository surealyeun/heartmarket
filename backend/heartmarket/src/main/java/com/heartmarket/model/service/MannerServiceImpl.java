package com.heartmarket.model.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.MannerRepository;
import com.heartmarket.model.dao.ReviewRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Manner;
import com.heartmarket.model.dto.Review;
import com.heartmarket.model.dto.response.ReviewResponse;
import com.heartmarket.util.ResultMap;

@Service
public class MannerServiceImpl implements MannerService{

	@Autowired
	MannerRepository mr;
	@Autowired
	ReviewRepository rr;
	@Autowired
	TradeRepository tr;

	@Autowired
	UserRepository ur;
	// 매너에서 필요한 기능
	// 매너  평가
	// 공식 대입으로 평가  점수 저장
	// 평가는 3 택 1
	// user 를 기반으로 저장
	

	public Manner evalueManner(int value, int userNo){
	
		Manner tMnr = mr.findBymUserUserNo(userNo);
		
		double pGauge = tMnr.getPlusGauge();
		double nGauge = tMnr.getNormalGauge();
		double mGauge = tMnr.getMinusGauge();
		double hg = tMnr.getHeartGauge();
		
		// 긍정
		if(value == 3) {
			pGauge = pGauge >= 0 ? pGauge + 1 : 0;
//			if( pGauge >= 0 )tMnr.setPlusGauge(pGauge+1);
//			else tMnr.setPlusGauge(0);
		}
		// 보통
		else if(value == 0) {
//			tMnr.setNormalGauge(nGauge+1);
			nGauge+=1;
		}
		// 부정
		else {
			mGauge = mGauge >= 0 ? mGauge+1 : 0;
//			if(mGauge >= 0) tMnr.setMinusGauge(mGauge+1);
//			else tMnr.setMinusGauge(0);
		}
		
		double calc = hg + (pGauge + nGauge + mGauge)*(0.1)/hg;
		System.out.println(calc);
		
		tMnr.setPlusGauge(pGauge);
		tMnr.setNormalGauge(nGauge);
		
		tMnr.setMinusGauge(mGauge);
		tMnr.setHeartGauge(calc);
		
//		mr.save(tMnr);
//		return new ResultMap<Manner>("SUCCESS", "평가완료", tMnr);
		return tMnr;
	}
	
	// 매너 평가를 위해서는 거래 완료가 필요하다.
	// 거래 완료 여부를 확인하고
	@Override
	public ResultMap<ReviewResponse> evalueUser(int tradeNo, int userNo, int val){
		try {
			// 매너 평가 완료
//			if(Objects.isNull(tr.findByTradeNo(tradeNo))) {
//				
//			}
			// 리뷰 등록 완료 
			Review rev = rr.findByrTradeTradeNo(tradeNo);
			System.out.println("review : " + rr.findByrTradeTradeNo(tradeNo));
			
			if(rev == null){
				Review rvw = new Review(tr.findByTradeNo(tradeNo));	
				Manner rMnr = evalueManner(val, userNo);
				System.out.println(rMnr);
				mr.save(rMnr);
				rr.save(rvw);
				return new ResultMap<ReviewResponse>("SUCCESS", "평가 완료", new ReviewResponse( rvw,rMnr));
			}else {
				return new ResultMap<ReviewResponse>("FAIL", "이미 평가가 완료된 게시글입니다.", null);
			}
			
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	@Override
	public ResultMap<Map<String, Double>> findManner(String email){
		try {
			Manner manner = mr.findBymUserUserNo(ur.findByEmail(email).getUserNo());
			if(manner != null) {
				Map<String, Double> rm = new HashMap<String, Double>();
				rm.put("heartgauge", manner.getHeartGauge());
				return new ResultMap<Map<String, Double>>("SUCCESS", "매너 불러오기", rm);
			}else {
				return new ResultMap<Map<String, Double>>("FAIL", "찾을 수 없는 유저입니다.", null);
			}
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	
}
