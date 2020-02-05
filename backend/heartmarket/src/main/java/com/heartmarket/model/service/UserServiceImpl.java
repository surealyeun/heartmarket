package com.heartmarket.model.service;

import java.util.List;

import javax.transaction.Transactional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.User;
import com.heartmarket.util.ResultMap;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository ur;

	@Override
	public boolean login(String email,String password) {
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
			if(tUser == null) {
				return new ResultMap<User>("SUCCESS", "Not Duplicated", null);
			}
			return new ResultMap<User>("Fail", "Duplicated", tUser);
		}catch(Exception e) {
			throw e;
		}
	}

	// 사용자 탈퇴
	@Override
	public void delete(User user) {
		try {
			User deleteUser = ur.findByEmail(user.getEmail());
			if(deleteUser==null) {
				throw new Exception("가입되지 않은 이메일입니다.");
			}
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
	public void signUp(User user) {
		try {
			User joinUser = ur.findByEmail(user.getEmail());
			if(joinUser==null) {
				this.ur.save(user);
			}else {
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
		System.out.println(user.getUserNo());
		int result = user.getUserNo()+1;
		return result;
	}
}
