package com.heartmarket.model.dto.response;

import com.heartmarket.model.dto.User;


import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

	User tUser;
	double heartguage;

}
