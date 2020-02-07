package com.heartmarket.model.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
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
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter @Setter
@Table(name="cart")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
