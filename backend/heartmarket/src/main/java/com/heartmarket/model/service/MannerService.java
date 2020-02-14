package com.heartmarket.model.service;

import org.springframework.data.domain.Page;

import com.heartmarket.model.dto.Manner;
import com.heartmarket.model.dto.response.OtherTrade;
import com.heartmarket.util.ResultMap;

public interface MannerService {

	public ResultMap<Manner> evalueUser(int value, int userNo);
	
}
