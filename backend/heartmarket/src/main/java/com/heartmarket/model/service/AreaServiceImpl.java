package com.heartmarket.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.AreaRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Area;
import com.heartmarket.model.dto.User;

@Service
public class AreaServiceImpl implements AreaService{
	
	@Autowired
	AreaRepository ar;
	@Autowired
	UserRepository ur;
	
	// 부모의 연관관계 삽입을 성공하여 현재 미사용
	@Override
	public void insertArea(String address,int userNo) {
		try {
			List<Area> all = ar.findByaUserUserNo(userNo);
			int count = ar.findTop1ByOrderByAreaNoDesc().getAreaNo();
			ar.resortAreaNo(count);
			if(all.size() > 2 ) {
				throw new Exception("지정할 수 있는 동네 갯수 2개를 초과했습니다.");
			}else {
				User user = ur.findByUserNo(userNo);
				Area area = new Area(address);
				area.setAUser(user);
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
