package com.heartmarket.model.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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
@Entity
@Getter @Setter
@Table(name = "manner")
public class Manner implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "manner_no")
	int mannerNo;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_no")
	@ToString.Exclude
	User mUser;
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	double plusGauge;
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	double normalGauge;
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	double minusGauge;
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	double heartGauge;
	
	public Manner(User mUser, double plusGauge, double normalGauge, double minusGauge, double heartGauge) {
		super();
		this.mUser = mUser;
		this.plusGauge = plusGauge;
		this.normalGauge = normalGauge;
		this.minusGauge = minusGauge;
		this.heartGauge = heartGauge;
	}
	
	
}
