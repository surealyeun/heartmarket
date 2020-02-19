package com.heartmarket.model.service;

import java.util.List;

import com.heartmarket.model.dto.Area;
import com.heartmarket.model.dto.User;

public interface AreaService {
	public void insertArea(String address,int userNo);
	public List<Area> searchAreaByUser(User user);
	public List<Area> searchAreaByAddress(String address);
	public void updateArea(Area area);
}
