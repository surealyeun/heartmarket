package com.heartmarket.util;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import com.heartmarket.model.service.JwtService;

public class JwtAuthenticationFilter extends GenericFilterBean{
	
	private JwtService jwtService;

	//jwt provider 주입
	public JwtAuthenticationFilter(JwtService jwtService) {
		this.jwtService = jwtService;
	}
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		String token = jwtService.resolveToken((HttpServletRequest)request);
		try {
			if(token != null && jwtService.checkJwt(token)) {
				Authentication auth = jwtService.getAuthentication(token);
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
