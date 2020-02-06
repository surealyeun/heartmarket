package com.heartmarket.model.dto;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "buyer")
@Getter @Setter
//@ToString(exclude = {"bUser", "bTrade"})
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Buyer {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int buyerNo;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_no",insertable = false, updatable = false)
	@ToString.Exclude
	@JsonBackReference
	User bUser;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "trade_no",insertable = false, updatable = false)
	@ToString.Exclude
	@JsonBackReference
	Trade bTrade;
}
