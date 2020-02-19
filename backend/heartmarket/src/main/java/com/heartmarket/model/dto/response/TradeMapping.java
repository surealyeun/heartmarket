package com.heartmarket.model.dto.response;

import java.util.List;

import com.heartmarket.model.dto.TradeImg;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TradeMapping {
	
	int tradeNo;
	String tTitle;
	String tArea;
	int pPrice;
	int uNo;
	int bNo;
	String uImg;
	String uNicname;
//	List<TradeImg> tList;
	String tList;
	int cNo;
	String category;
}
