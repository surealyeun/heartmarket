package com.heartmarket.model.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.heartmarket.model.dto.Mail;
import com.heartmarket.model.dto.Manner;
import com.heartmarket.util.ResultMap;

public interface MailService {
	public ResultMap<Mail> addSender(String senderMail, String receiverMail,String tradeNo,String title,String content);
	public ResultMap<Mail> readReceiver(String receiverMail,String mailNo);
	public ResultMap<Mail> deleteSender(String senderMail,String mailNo);
	public ResultMap<Mail> deleteReceiver(String receiverMail,String mailNo);
//	public ResultMap<List<Mail>> findAllReceive(String receiverMail);
	public Page<Mail> findAllSend(int no,int size,String senderMail);
	public Page<Mail> findAllReceive(int no,int size,String receiverMail);
	public Page<Mail> findAllReaded(int no, int size,String receiverMail);
	public Page<Mail> findAllUnReaded(int no, int size,String receiverMail);
	public int findAllReceiveCount(String receiverMail);
	public int findAllSendCount(String senderMail);
	public int findReadCount(String receiverMail);
	public int findUnReadCount(String receiverMail);
}
