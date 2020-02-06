package com.heartmarket.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.service.JwtService;

// JWT 테스트를 위한 컨트롤러 미사용
//@RestController
//@CrossOrigin("*")
public class JwtController {
	/*
	 * @Autowired private JwtService jwtService;
	 * 
	 * @PostMapping("/jwt/create") public String createJwt(HttpServletRequest req)
	 * throws Exception { return jwtService.makeJwt(req); }
	 * 
	 * @GetMapping("/jwt/auth") public boolean authToken(HttpServletRequest res)
	 * throws Exception { String jwt = res.getParameter("jwt");
	 * 
	 * if(jwt == null) { return false; }else { return jwtService.checkJwt(jwt); } }
	 */
}
