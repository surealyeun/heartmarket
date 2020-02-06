package com.heartmarket.model.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@ToString(exclude = "tiTrade")
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "tradeImg")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "imgNo")
public class TradeImg {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int imgNo;
	
	@ManyToOne(fetch = FetchType.EAGER) 
	@JoinColumn(name = "trade_no")
	@ToString.Exclude
	Trade tiTrade;
	
//	String productImg; // 이미지 주소
	String orgImg;
	String storedImg;
	

}
