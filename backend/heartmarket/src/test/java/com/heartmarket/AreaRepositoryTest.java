package com.heartmarket;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.heartmarket.model.dao.AreaRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Area;
import com.heartmarket.model.dto.User;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AreaRepositoryTest {
	
	@Autowired
	AreaRepository areaRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Test
	public void createArea() {
		User user = new User();
		user.setNickname("테스트");
		user.setProfileImg("img.png");
		user.setUserPermission("guest");
		
		userRepository.save(user);
		
		Area area = new Area();
		area.setAddress("역삼동");
		area.setAUser(user);
		
		areaRepository.save(area);
		
		List<Area> getAreas = areaRepository.findAll();
//		List<Area> getA = areaRepository.findAllByaUser(user);
		
//		for (Area area2 : getA) {
//			System.out.println(area2.getAddress());
//		}
//		for (Area area2 : getAreas) {
//			assertThat(area2.getAddress().equals("역삼동"));
//			System.out.println(area2.getAUser().getUserNo());
//			assertThat(area2.getAUser().getNickname().equals("테스트"));
//		}
	}
}
