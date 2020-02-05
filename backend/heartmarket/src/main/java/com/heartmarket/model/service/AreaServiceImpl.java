package com.heartmarket.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.AreaRepository;
import com.heartmarket.model.dto.Area;
import com.heartmarket.model.dto.User;

@Service
public class AreaServiceImpl implements AreaService{
	
	@Autowired
	AreaRepository ar;
	
	@Override
	public void insertArea(String address,int userNo) {
		try {
			List<Area> all = ar.findByaUserUserNo(userNo);
			int count = ar.findTop1ByOrderByAreaNoDesc().getAreaNo();
			ar.resortAreaNo(count);
			if(all.size() > 2 ) {
				throw new Exception("지정할 수 있는 동네 갯수 2개를 초과했습니다.");
			}else {
				Area area = new Area(address);
				ar.save(area);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Area> searchAreaByUser(User user) {
		try {
			return ar.findByaUserUserNo(user.getUserNo());
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	@Override
	public void updateArea(Area area) {
		try {
			ar.save(area);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Area> searchAreaByAddress(String address) {
		try {
			return ar.findByAddressLike("%"+address+"%");
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
}
