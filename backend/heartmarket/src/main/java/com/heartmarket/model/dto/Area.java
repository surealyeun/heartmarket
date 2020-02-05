package com.heartmarket.model.dto;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
//@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter @Setter
@Table(name = "area")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "areaNo")
public class Area {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int areaNo;
	
	String address;
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name="user_no",insertable = false, updatable = false)
	@ToString.Exclude
	@JsonBackReference
	User aUser;
	
	public Area(String address) {
		this.address = address;
	}
	public Area(String address,User aUser) {
		this.address = address;
		this.aUser = aUser;
	}
}
