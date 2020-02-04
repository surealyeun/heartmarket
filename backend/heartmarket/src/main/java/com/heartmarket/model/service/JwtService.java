package com.heartmarket.model.service;

import javax.servlet.http.HttpServletRequest;

public interface JwtService {
	public String makeJwt(HttpServletRequest req) throws Exception;
	public boolean checkJwt(String jwt) throws Exception;
//	public String getUserEmail(String jwt) throws Exception;
//	public String getUserUID(String jwt) throws Exception;
}
