package com.heartmarket.model.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
public class TradeImg {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int imgNo;
	
	@ManyToOne
	@JoinColumn(name = "trade_no")
	@ToString.Exclude
	Trade tiTrade;
	
	String productImg;
	

}
