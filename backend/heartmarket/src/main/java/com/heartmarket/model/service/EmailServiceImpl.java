package com.heartmarket.model.service;

import java.util.Date;
import java.util.Random;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
	@Autowired
	JavaMailSender javaMailSender;
	
	String setfrom = "Heart@heartmarket.com";
	String title = "회원 가입 인증 이메일 입니다.";
	
	@Override
	public void sendMail(String email,int key) throws Exception{
		String content =
			    System.getProperty("line.separator")+ //한줄씩 줄간격을 두기위해 작성
			    System.getProperty("line.separator")+
			    "안녕하세요 회원님  두근마켓을 찾아주셔서 감사합니다"
			    +System.getProperty("line.separator")+
			    System.getProperty("line.separator")+
			    " 인증번호는 " +key+ " 입니다. "
			    +System.getProperty("line.separator")+
			    System.getProperty("line.separator")+
			    "받으신 인증번호를 홈페이지에 입력해 주시면 다음으로 넘어갑니다."; // 내용
		try {
			MimeMessage message = javaMailSender.createMimeMessage();
			message.setFrom(new InternetAddress(setfrom,"두근마켓","UTF-8"));
			message.setSubject(title);
			message.setRecipient(Message.RecipientType.TO, new InternetAddress(email));
			message.setText(content);
			message.setSentDate(new Date());
			javaMailSender.send(message);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		
	}
}
