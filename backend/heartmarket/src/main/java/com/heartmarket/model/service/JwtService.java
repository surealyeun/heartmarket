package com.heartmarket.model.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;

import com.heartmarket.model.dto.User;

public interface JwtService {
//	public String makeJwt(HttpServletRequest req) throws Exception;
	public String makeJwt(User user) throws Exception;
	public boolean checkJwt(String jwt) throws Exception;
	public String getUserEmail(String jwt);
//	public String getUserUID(String jwt) throws Exception;
	public String resolveToken(HttpServletRequest req);
	public Authentication getAuthentication(String token);
}
