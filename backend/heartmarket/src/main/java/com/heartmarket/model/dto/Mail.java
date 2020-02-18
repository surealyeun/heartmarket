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
	@JoinColumn(name = "trade_no",referencedColumnName = "trade_no")
	Trade trade;
	
	@ManyToOne
	@JoinColumn(name = "sender_no",referencedColumnName = "user_no")
	User sender;
	
	@ManyToOne
	@JoinColumn(name = "receiver_no",referencedColumnName = "user_no")
	User receiver;
	
	@Column(name = "title")
	String title;
	
	@Column(name = "content")
	String content;
	
	@Column(name = "read_date")
	String readDate;
	
	@Column(name = "send_date")
	String sendDate;
	
	@Column(name = "read_del")
	int readDel;

	@Column(name = "send_del")
	int sendDel;

	public Mail(User sender, User receiver,Trade trade,String title, String content, String sendDate, int readDel,
			int sendDel) {
		super();
		this.sender = sender;
		this.receiver = receiver;
		this.trade = trade;
		this.title = title;
		this.content = content;
		this.sendDate = sendDate;
		this.readDel = readDel;
		this.sendDel = sendDel;
	}

	
}
