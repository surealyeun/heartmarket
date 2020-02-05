package com.heartmarket.model.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Getter @Setter
@Entity
@Table(name="trade")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "tradeNo")
public class Trade {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer tradeNo;
	
	String tradeCategory;
	String tradeTitle;
//	Integer userNo;
	String productName;
	String tradeArea;
	String productInfo;
	String productPrice;
	String tradeDate;
	
//	@OneToMany(mappedBy = "cTrade")
//	List<Cart> tCart;
//	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_no",insertable = false, updatable = false)
	@ToString.Exclude
	@JsonBackReference
	User tUser;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "buyer_no",insertable = false, updatable = false)
	@ToString.Exclude
	@JsonBackReference
	User bUser;
	
	@OneToOne(mappedBy = "mTrade")
	@ToString.Exclude
	@JsonManagedReference
	Manner tManner;
	
	@OneToMany(mappedBy = "tiTrade", fetch = FetchType.LAZY)
	@ToString.Exclude 
	@JsonManagedReference
	List<TradeImg> tTradeImg;
	
}
