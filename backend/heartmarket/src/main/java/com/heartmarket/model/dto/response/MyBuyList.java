package com.heartmarket.model.dto.response;

import java.util.List;

import com.heartmarket.model.dto.Trade;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyBuyList {

	MyBuyListTrade bTrade;
	int eval;
}
