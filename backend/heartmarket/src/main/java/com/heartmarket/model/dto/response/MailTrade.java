package com.heartmarket.model.dto.response;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class MailTrade {
	int tradeNo;
	String tradeTitle;
	String productInfo;
	List<MailTradeImg> tTradeImg;
}
