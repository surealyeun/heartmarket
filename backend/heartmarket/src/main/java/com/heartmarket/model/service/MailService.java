package com.heartmarket.model.service;

import java.util.List;

import com.heartmarket.model.dto.Mail;

public interface MailService {
	public void addSender();
	public void addReceiver();
	public void deleteSender();
	public void deleteReceiver();
	public List<Mail> findAllSend();
	public List<Mail> findAllReceive();
}
