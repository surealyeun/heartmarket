package com.heartmarket.model.dto;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//@ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
@Entity
@Table(name="user")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class,property = "userNo")
public class User{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Integer userNo;
	
	String email;
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	String password;
	String profileImg;
	String nickname;
	// 유저인지 관리자인지 확인
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
	
	@OneToMany(mappedBy = "aUser",fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	List<Area> uArea;
	
//	@OneToOne(mappedBy = "cUser")
//	Cart uCart;
//	
//	@OneToMany(mappedBy = "tUser")
//	List<Trade> uTrade;
//	
//	@OneToOne(mappedBy = "bUser")
//	Buyer uBuyer;

	
}
