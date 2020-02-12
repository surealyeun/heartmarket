package com.heartmarket.model.service;

import com.heartmarket.model.dto.Manner;
import com.heartmarket.util.ResultMap;

public interface MannerService {

	public ResultMap<Manner> evalueUser(int value, int userNo);
}
