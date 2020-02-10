package com.heartmarket.model.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@ToString(exclude = {"cUser", "cTrade"})
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter @Setter
@Table(name="cart")
public class Cart implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "cart_no")
	int cartNo;
	
	@OneToOne
	@JoinColumn(name="user_no")
	@ToString.Exclude
	@JsonBackReference
	User cUser;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="trade_no", insertable = false, updatable = false)
	@ToString.Exclude
	@JsonBackReference
	Trade cTrade;
	
	
}
