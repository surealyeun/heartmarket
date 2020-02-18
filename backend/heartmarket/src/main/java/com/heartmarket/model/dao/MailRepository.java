package com.heartmarket.model.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Mail;
import com.heartmarket.model.dto.User;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {
	Mail findBySenderUserNo(int userNo);
	Mail findBySenderUserNoAndMailNo(int userNo,int mailNo);
	Mail findByReceiverUserNo(int userNo);
	List<Mail> findAllByReceiverUserNoAndReadDelAndReadDateIsNull(int userNo,int readDel);
	List<Mail> findAllByReceiverUserNoAndReadDelAndReadDateIsNotNull(int userNo,int readDel);
	Mail findByReceiverUserNoAndMailNo(int userNo,int mailNo);
	List<Mail> findAllBySenderUserNoAndSendDel(int userNo,int sendDel);
	List<Mail> findAllByReceiverUserNoAndReadDel(int userNo,int readDel);
	
	//page 기능
	Page<Mail> findAllBySenderUserNoAndSendDel(int userNo,int sendDel,Pageable req);
	Page<Mail> findAllByReceiverUserNoAndReadDel(int userNo,int readDel, Pageable req);
	Page<Mail> findAllByReceiverUserNoAndReadDelAndReadDateIsNull(int userNo,int readDel,Pageable req);
	Page<Mail> findAllByReceiverUserNoAndReadDelAndReadDateIsNotNull(int userNo,int readDel,Pageable req);
}
