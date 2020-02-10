package com.heartmarket.model.dto;

import java.io.Serializable;
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
import javax.persistence.Transient;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
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
@Getter @Setter
@Entity
@Table(name="trade")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "tradeNo")
public class Trade implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "trade_no")
	Integer tradeNo;
	
	@Column(name = "trade_category")
	String tradeCategory;
	@Column(name = "trade_title")
	String tradeTitle;
	@Column(name = "product_name")
	String productName;
	@Column(name = "trade_area")
	String tradeArea;
	@Column(name = "product_info")
	String productInfo;
	@Column(name = "product_price")
	String productPrice;
	@Column(name = "trade_date")
	String tradeDate;
	
//	@OneToMany(mappedBy = "cTrade")
//	List<Cart> tCart;
//	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_no",insertable = false, updatable = false)
	@ToString.Exclude
	User tUser;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "buyer_no",insertable = false, updatable = false)
	@ToString.Exclude
	User bUser;
	
	@OneToOne(mappedBy = "mTrade")
	@ToString.Exclude
	@Transient
	Manner tManner;
	
	@OneToMany(mappedBy = "tiTrade", fetch = FetchType.LAZY)
	@ToString.Exclude
	@Transient
	List<TradeImg> tTradeImg;
	
}
