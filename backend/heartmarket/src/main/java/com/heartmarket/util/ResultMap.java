package com.heartmarket.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultMap<T> {

	String state; // 성공여부 (success or fail)
	String message; // 에러메시지 (무엇이 문제인가?)
	T data; // 클래스 별 json
}
