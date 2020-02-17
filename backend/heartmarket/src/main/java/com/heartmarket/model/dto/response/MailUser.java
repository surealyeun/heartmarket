package com.heartmarket.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class MailUser {
	int userNo;
	String email;
	String nickname;
	String profileImg;
}
