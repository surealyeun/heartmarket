package com.heartmarket.controller;

import java.util.Random;

import javax.mail.internet.MimeMessage;

import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dto.TradeImg;

@Controller
@CrossOrigin("*")
public class MainController {
	
	@Autowired
	JavaMailSender mailSender;
	
	@Autowired
	TradeImgRepository tr;
	
	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/view")
	public String goView(Model mv) {
		TradeImg tmg = tr.findById(15).orElse(null);
		System.out.println(tmg.getOrgImg());
		mv.addAttribute("goods", tmg);
//		mv.addAttribute("ss", "http://i02a208.p.ssafy.io:8080/img/2020/02/07/b219f886-3926-453a-949d-300ebea4e88d_두근마켓.png");
		return "view";
	}
}
