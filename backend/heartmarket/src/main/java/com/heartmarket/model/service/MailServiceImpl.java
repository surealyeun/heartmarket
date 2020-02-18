package com.heartmarket.model.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dao.MailRepository;
import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dao.UserRepository;
import com.heartmarket.model.dto.Mail;
import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;
import com.heartmarket.util.ResultMap;

@Service
public class MailServiceImpl implements MailService {
	
	@Autowired
	MailRepository mr;
	
	@Autowired
	UserRepository ur;
	
	@Autowired 
	TradeRepository tr;
	/* 
		Mail의 필드
		sender : 발신자
		receiver : 수신자
		title : 제목
		content : 내용
		read_date : 열람일자
		send_date : 발송일자
		send_del : 발신자 기준에서 보낸 메시지함에서 내용 표시 여부 0: 표시 / 1: 은 미표시
		read_del : 수신자 기준에서 받은 메시지함에서 내용 표시 여부 0: 표시 / 1: 은 미표시
	*/

	// 메일을 보낼때 저장하는 부분
	@Override
	public ResultMap<Mail> addSender(String senderMail,String receiverMail,String tradeNo, String title,String content) {
		try {
			User sender = ur.findByEmail(senderMail);
			User receiver = ur.findByEmail(receiverMail);
			Trade trade = tr.findByTradeNo(Integer.parseInt(tradeNo));
			Date date = new Date();
			SimpleDateFormat transeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time = transeFormat.format(date);
			Mail mail = new Mail(sender,receiver,trade,title,content,time,0,0);
			mr.save(mail);
			return new ResultMap<Mail>("SUCCESS","쪽지 전송 및 저장 성공",mail);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return new ResultMap<Mail>("FAIL",e.getMessage(),null);
		}
	}

	@Override
	public ResultMap<Mail> deleteSender(String senderMail,String mailNo) {
		try {
			User sender = ur.findByEmail(senderMail);
			Mail mail = mr.findBySenderUserNoAndMailNo(sender.getUserNo(),Integer.parseInt(mailNo));
			if(mail == null) {
				return new ResultMap<Mail>("FAIL","해당 유저가 보낸 쪽지가 존재하지 않습니다",null);
			}else {
				mail.setSendDel(1);
				mr.save(mail);
				return new ResultMap<Mail>("SUCCESS","보낸 쪽지함의 쪽지가 삭제 처리 되었습니다.",mail);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			throw e;
		}
	}

	@Override
	public ResultMap<Mail> deleteReceiver(String receiverMail,String mailNo) {
		try {
			User receiver = ur.findByEmail(receiverMail);
			Mail mail = mr.findByReceiverUserNoAndMailNo(receiver.getUserNo(),Integer.parseInt(mailNo));
			if(mail == null) {
				return new ResultMap<Mail>("FAIL","해당 유저가 받은 쪽지가 존재하지 않습니다",null);
			}else {
				mail.setReadDel(1);
				mr.save(mail);
				return new ResultMap<Mail>("SUCCESS","받은 쪽지함의 쪽지가 삭제 처리 되었습니다.",mail);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			throw e;
		}
	}

	@Override
	public Page<Mail> findAllSend(int no, int size, String senderMail) {
		try {
			User sender = ur.findByEmail(senderMail);
			PageRequest pr = PageRequest.of(no, size, Sort.by("MailNo").descending());
			return mr.findAllBySenderUserNoAndSendDel(sender.getUserNo(),0, pr);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			throw e;
		}
	}

	@Override
	public ResultMap<Mail> readReceiver(String receiverMail,String mailNo) {
		try {
			Date date = new Date();
			SimpleDateFormat transeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time = transeFormat.format(date);
			User receiver = ur.findByEmail(receiverMail);
			Mail mail = mr.findByReceiverUserNoAndMailNo(receiver.getUserNo(), Integer.parseInt(mailNo));
			mail.setReadDate(time);
			mr.save(mail);
			return new ResultMap<Mail>("SUCCESS","받은 쪽지가 읾음 처리 되었습니다.",mail);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			return new ResultMap<Mail>("FAIL",e.getMessage(),null);
		}
		
	}

	@Override
	public Page<Mail> findAllReaded(int no,int size,String receiverMail) {
		try {
			User receiver = ur.findByEmail(receiverMail);
			PageRequest pr = PageRequest.of(no, size, Sort.by("MailNo").descending());
			return mr.findAllByReceiverUserNoAndReadDelAndReadDateIsNotNull(receiver.getUserNo(),0, pr);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			throw e;
		}
	}

	
	@Override
	public Page<Mail> findAllUnReaded(int no, int size, String receiverMail) {
		try {
			User receiver = ur.findByEmail(receiverMail);
			PageRequest pr = PageRequest.of(no, size, Sort.by("MailNo").descending());
			return mr.findAllByReceiverUserNoAndReadDelAndReadDateIsNull(receiver.getUserNo(),0, pr);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			throw e;
		}
	}

	@Override
	public Page<Mail> findAllReceive(int no, int size, String receiverMail) {
		try {
			User receiver = ur.findByEmail(receiverMail);
			PageRequest pr = PageRequest.of(no, size, Sort.by("MailNo").descending());
			return mr.findAllByReceiverUserNoAndReadDel(receiver.getUserNo(),0, pr);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(e.getMessage());
			throw e;
		}
	}

	@Override
	public int findAllReceiveCount(String receiverMail) {
		User user = ur.findByEmail(receiverMail);
		List<Mail> result = mr.findAllByReceiverUserNoAndReadDel(user.getUserNo(),0);
		return result.size();
	}

	@Override
	public int findAllSendCount(String senderMail) {
		User user = ur.findByEmail(senderMail);
		List<Mail> result = mr.findAllBySenderUserNoAndSendDel(user.getUserNo(),0);
		return result.size();
	}

	@Override
	public int findReadCount(String receiverMail) {
		User user = ur.findByEmail(receiverMail);
		List<Mail> result = mr.findAllByReceiverUserNoAndReadDelAndReadDateIsNotNull(user.getUserNo(),0);
		return result.size();
	}

	@Override
	public int findUnReadCount(String receiverMail) {
		User user = ur.findByEmail(receiverMail);
		List<Mail> result = mr.findAllByReceiverUserNoAndReadDelAndReadDateIsNull(user.getUserNo(),0);
		return result.size();
	}

	

}
