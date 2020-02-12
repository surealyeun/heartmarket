package com.heartmarket.model.service;

import java.util.List;

import com.heartmarket.model.dto.User;
import com.heartmarket.util.ResultMap;

public interface UserService {
	public boolean login(String email,String password);
	public User searchEmail(String email);
	public List<User> searchAll();
	public void signUp(User user,String address);
	public void update(User user);
	public void delete(User user);
	public int searchCount();
	public ResultMap<User> duplicatedByEmail(String email);
	User findByUser(int userNo);
}
