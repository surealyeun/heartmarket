package com.heartmarket.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mail")
@NoArgsConstructor
@AllArgsConstructor
@Setter @Getter
public class Mail {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "mail_no")
	int mailNo;
	
	@ManyToOne
	@JoinColumn(name = "sender_no",referencedColumnName = "user_no")
	User senderNo;
	
	@ManyToOne
	@JoinColumn(name = "receiver_no",referencedColumnName = "user_no")
	User receiverNo;
	
	@Column(name = "mail_code")
	int mailCode;
	
	@ManyToOne
	@JoinColumn(name = "content_no")
	MailContent content;
	
	@Column(name = "read_date")
	String readDate;
	@Column(name = "send_date")
	String SendDate;
	
}
