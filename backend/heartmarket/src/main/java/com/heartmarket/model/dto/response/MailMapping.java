package com.heartmarket.model.dto.response;

import com.heartmarket.model.dto.Trade;
import com.heartmarket.model.dto.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class MailMapping {
	int mailNo;
	MailTrade trade;
	MailUser sender;
	MailUser receiver;
	String title;
	String content;
	String readDate;
	String SendDate;
	int readDel;
	int SendDel;
}
