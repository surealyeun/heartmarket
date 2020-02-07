package com.heartmarket.model.dto;

import java.io.Serializable;

import javax.persistence.CascadeType;
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
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name = "trade_img")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "imgNo")
public class TradeImg implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "img_no")
	int imgNo;
	
	@ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.PERSIST) 
	@JoinColumn(name = "trade_no")
	@ToString.Exclude
	Trade tiTrade;
	
//	String productImg; // 이미지 주소
	@Column(name = "org_img")
	String orgImg;
	@Column(name = "stored_img")
	String storedImg;
	@Override
	public String toString() {
		return "TradeImg [imgNo=" + imgNo + ", orgImg=" + orgImg + ", storedImg=" + storedImg
				+ "]";
	}
	
	

}
