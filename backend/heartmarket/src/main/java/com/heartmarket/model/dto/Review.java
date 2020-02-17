package com.heartmarket.model.dto;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "review")
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewNo;
	
	@JoinColumn(name = "trade_no")
	@OneToOne(cascade = CascadeType.PERSIST)
	@ToString.Exclude
//	@Transient
	Trade rTrade;

	public Review(Trade rTrade) {
		super();
		this.rTrade = rTrade;
	}
	
	
	
}
