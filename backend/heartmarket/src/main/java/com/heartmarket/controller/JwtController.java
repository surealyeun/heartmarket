package com.heartmarket.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.heartmarket.model.service.JwtService;

@RestController
@CrossOrigin("*")
public class JwtController {
	@Autowired
	private JwtService jwtService;
	
	@PostMapping("/jwt/create")
	public String createJwt(HttpServletRequest req) throws Exception {
//		System.out.println(jwtService.makeJwt(req));
		return jwtService.makeJwt(req);
	}
	 @GetMapping("/jwt/auth")
     public boolean authToken(HttpServletRequest res) throws Exception {
         String jwt = res.getParameter("jwt");

         if(jwt == null) {
             return false;
         }else {
             return jwtService.checkJwt(jwt);
         }
     }
}
