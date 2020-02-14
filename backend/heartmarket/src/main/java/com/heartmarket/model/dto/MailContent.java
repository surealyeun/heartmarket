package com.heartmarket.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mail_content")
@Setter @Getter
@NoArgsConstructor
@AllArgsConstructor
public class MailContent {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "content_no")
	int contentNo;
	
	@Column(name = "content_title")
	String contentTilte;
	
	@Column(name = "content_info")
	String contentInfo;
	
	@OneToMany(mappedBy = "content")
	Mail mail;
}
