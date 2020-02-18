package com.heartmarket.model.dto.response;

import com.heartmarket.model.dto.Manner;
import com.heartmarket.model.dto.Review;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


// 평가를 완료 했을 때,
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {

	Review review;
	Manner manner;
}
