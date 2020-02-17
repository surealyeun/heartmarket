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
	List<Mail> findAllByReceiverUserNoAndReadDateIsNull(int userNo);
	List<Mail> findAllByReceiverUserNoAndReadDateIsNotNull(int userNo);
	Mail findByReceiverUserNoAndMailNo(int userNo,int mailNo);
	List<Mail> findAllBySenderUserNo(int userNo);
	List<Mail> findAllByReceiverUserNo(int userNo);
	
	//page 기능
	Page<Mail> findAllBySenderUserNo(int userNo,Pageable req);
	Page<Mail> findAllByReceiverUserNo(int userNo, Pageable req);
	Page<Mail> findAllByReceiverUserNoAndReadDateIsNull(int userNo,Pageable req);
	Page<Mail> findAllByReceiverUserNoAndReadDateIsNotNull(int userNo,Pageable req);
}
