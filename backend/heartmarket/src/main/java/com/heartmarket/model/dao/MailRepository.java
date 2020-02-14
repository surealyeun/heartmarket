package com.heartmarket.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.heartmarket.model.dto.Mail;

@Repository
public interface MailRepository extends JpaRepository<Mail, Integer> {

}
