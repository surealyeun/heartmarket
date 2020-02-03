package com.heartmarket.model.dto;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//@ToString(exclude = {"mUser", "mTrade"})
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Entity
@Getter @Setter
@Table(name = "manner")
public class Manner {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int mannerNo;
	
	@ManyToOne
	@JoinColumn(name = "user_no")
	@ToString.Exclude
	User mUser;
	
	@OneToOne
	@JoinColumn(name ="trade_no")
	@ToString.Exclude
	Trade mTrade;
	
	int mannerPoint;
	String user_type;
	String mannerType;
	
}
