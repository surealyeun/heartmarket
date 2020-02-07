package com.heartmarket.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.MannerRepository;
import com.heartmarket.model.dto.Manner;
import com.heartmarket.util.ResultMap;

@Service
public class MannerServiceImpl implements MannerService{

	@Autowired
	MannerRepository mr;
	
	// 매너에서 필요한 기능
	// 매너  평가
	// 공식 대입으로 평가  점수 저장
	// 평가는 3 택 1
	// user 를 기반으로 저장
	
	@Override
	public ResultMap<Manner> evalueUser(int value, int userNo){
	
		Manner tMnr = mr.findBymUserUserNo(userNo) == null ? new Manner() : mr.findBymUserUserNo(userNo);
		
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
		
		tMnr.setPlusGauge(pGauge);
		tMnr.setNormalGauge(nGauge);
		tMnr.setMinusGauge(mGauge);
		tMnr.setHeartGauge(calc);
		
		mr.save(tMnr);
		return new ResultMap<Manner>("SUCCESS", "평가완료", tMnr);
	}
}
