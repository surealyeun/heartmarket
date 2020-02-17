package com.heartmarket.model.dto.response;

import java.util.List;

import com.heartmarket.model.dto.Trade;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MySellList {

	// 거래 리스트
	Trade sTrade;
	// 거래 완료 여부
	int complete;
}
