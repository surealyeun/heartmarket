package com.heartmarket.model.dto;

import java.util.*;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.apache.commons.lang3.builder.ToStringExclude;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name="user")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "userNo")
public class User implements Serializable{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_no")
	int userNo;
	

	String email; 
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	String password;
	@Column(name = "profile_img")
	String profileImg;
	String nickname;
	// 유저인지 관리자인지 확인
	@Column(name = "user_permission")
	String userPermission;
	
	public User(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
	
	public User(String email, String password, String profileImg, String nickname, String userPermission) {
		super();
		this.email = email;
		this.password = password;
		this.profileImg = profileImg;
		this.nickname = nickname;
		this.userPermission = userPermission;
	}
	
	public User(int userNo, String email, String password, String profileImg, String nickname, String userPermission) {
		super();
		this.userNo = userNo;
		this.email = email;
		this.password = password;
		this.profileImg = profileImg;
		this.nickname = nickname;
		this.userPermission = userPermission;
	}
	
	@OneToMany(mappedBy = "aUser",fetch = FetchType.EAGER,cascade = CascadeType.PERSIST)
	@ToString.Exclude
//	@Transient
	List<Area> uArea;
	
}
