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
		TradeImg tmg = tr.findById(8).orElse(null);
		System.out.println(tmg.getOrgImg());
		mv.addAttribute("goods", tmg);
		return "view";
	}
}
