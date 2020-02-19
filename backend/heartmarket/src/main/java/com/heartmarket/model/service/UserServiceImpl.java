package com.heartmarket.model.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import javax.transaction.Transactional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.AreaRepository;
import com.heartmarket.model.dao.MailRepository;
import com.heartmarket.model.dao.MannerRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Area;
import com.heartmarket.model.dto.Mail;
import com.heartmarket.model.dto.Manner;
import com.heartmarket.model.dto.User;
import com.heartmarket.model.dto.response.UserComplete;
import com.heartmarket.util.ResultMap;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

	@Autowired
	private UserRepository ur;
	@Autowired
	private AreaRepository ar;
	@Autowired
	private MannerRepository mr;
	@Autowired
	private MailRepository mar;

	// 유저 번호로 유저 찾기
	@Override
	public User findByUser(int userNo) {
		try {
			User fUser = ur.findByUserNo(userNo);
			if (fUser == null) {
				throw new Exception("유저를 찾을 수 없습니다.");
			}
			return fUser;
		} catch (Exception e) {
			e.printStackTrace();
//			throw e;
		}
		return null;
	}

	@Override
	public boolean login(String email, String password) {
		try {
			User loginUser = ur.findByEmail(email);
			if (loginUser == null) {
				throw new Exception("가입되지 않은 이메일입니다.");
			} else {
				if (BCrypt.checkpw(password, loginUser.getPassword())) {
//				if (loginUser.getPassword().equals(password)) {
					return true;
				} else {
					throw new Exception("비밀번호가 틀렸습니다.");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	// 사용자 조회 ( id로 )
	@Override
	public User searchEmail(String email) {
		return this.ur.findByEmail(email);
	}

	public ResultMap<User> duplicatedByEmail(String email) {
		try {
			User tUser = ur.findByEmail(email);
			if (tUser == null) {
				return new ResultMap<User>("SUCCESS", "Not Duplicated", null);
			}
			return new ResultMap<User>("Fail", "Duplicated", tUser);
		} catch (Exception e) {
			throw e;
		}
	}

	// 사용자 탈퇴
	@Override
	public void delete(User user) {
		try {
			User deleteUser = ur.findByEmail(user.getEmail());
			if (deleteUser == null) {
				throw new Exception("가입되지 않은 이메일입니다.");
			}
			mr.delete(mr.findBymUserUserNo(deleteUser.getUserNo()));
			ur.delete(deleteUser);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<User> searchAll() {
		return this.ur.findAll();
	}

	@Override
	// 사용자 등록 (회원가입)
	public void signUp(User user, String address) {
		try {
			User joinUser = ur.findByEmail(user.getEmail());
			if (joinUser == null) {
				// 받아온 주소값으로 area를 만들고 조인된 부모값을 할당
				Area area = new Area(address);
				area.setAUser(user);
				List<Area> areas = new ArrayList<Area>();
				areas.add(area);
				// area를 부모의 자식으로 할당 즉, 연관관계 양방향의 참조를 연결시켜주는
				user.setUArea(areas);
				// auto_incerement 수정
				ar.resortAreaNo(ar.findTop1ByOrderByAreaNoDesc().getAreaNo());
				ur.save(user);
				mr.save(new Manner(user, 0, 0, 0, 50));
				
			} else {
				throw new Exception("이미 존재하는 이메일 입니다.");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	// 사용자 수정
	public void update(User user) {
		try {
			ur.save(user);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	public int searchCount() {
		User user = ur.findTop1ByOrderByUserNoDesc();
		ur.resortUserNo(user.getUserNo());
		int result = user.getUserNo() + 1;
		return result;
	} 

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = ur.findByEmail(email);
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(user.getUserPermission()));
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
	}

	
	// 유저 닉네임 검색?
	@Override
	public User findByNickname(String nickname) {
		// 닉네임으로 유저를 검색합시다.
		try {
			User user = ur.findByNickname(nickname);
			return user;
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	// 판매자와 거래글 기준으로 쪽지를 나눴던 구매대상자들을 검색
	@Override
	public ResultMap<Object> findAllByNickname(int tradeNo, int userNo){
		try {
			List<Mail> mList = mar.findDistinctBySenderNoAndTradeNo(tradeNo, userNo);
//			System.out.println(mList.si);
			List<UserComplete> nList = new ArrayList<>();
			for (Mail mail : mList) {
				User mUser = ur.findByUserNo(mail.getSender().getUserNo());
				if(Objects.isNull(mUser)) continue;
				nList.add(new UserComplete(mUser.getNickname(), mUser.getEmail()));
//				System.out.println(mUser.getNickname());
				}
			return nList.size() == 0 ? 
					 new ResultMap<Object>("FAIL", "구매 확정 대상자 없음", null) 
					: new ResultMap<Object>("SUCCESS", "구매 대상자 목록 출력 완료", nList);
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
