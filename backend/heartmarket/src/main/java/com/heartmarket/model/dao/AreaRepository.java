package com.heartmarket.model.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Area;
import com.heartmarket.model.dto.User;

@Repository
public interface AreaRepository extends JpaRepository<Area, Integer	> {
	// 해당 user의 지역 정보를 불러오는 메서드
	List<Area> findAllByaUser(User user);
	
	Area findByaUserAndAddress(String address, int userNo);

	List<Area> findByaUserUserNo(int userNo);
	
	Area findByAreaNo(int areaNo);
	
	List<Area> findByAddressLike(String address);
	
	@Query(value = "alter table area auto_increment=:number",nativeQuery = true)
	public void resortAreaNo(@Param("number") int number);
	
	Area findTop1ByOrderByAreaNoDesc();
}
