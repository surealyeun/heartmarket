package com.heartmarket.model.dto.response;

import com.heartmarket.model.dto.Trade;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TradeDetail {

	Trade trade;
	int cno;
}
