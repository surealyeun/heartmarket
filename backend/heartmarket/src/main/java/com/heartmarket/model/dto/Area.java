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

import org.apache.commons.lang3.builder.ToStringExclude;

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
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter @Setter
@Table(name = "area")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "areaNo")
public class Area implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "area_no")
	int areaNo;
	
	String address;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="user_no")
	@ToString.Exclude
	User aUser;

	public Area(String address) {
		super();
		this.address = address;
	}
	
}
