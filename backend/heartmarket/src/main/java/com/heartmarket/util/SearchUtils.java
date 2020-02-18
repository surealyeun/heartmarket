package com.heartmarket.util;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

import org.springframework.data.jpa.domain.Specification;

import com.heartmarket.model.dao.TradeRepository;
import com.heartmarket.model.dto.Trade;

public class SearchUtils {

	// 검색창에서 문자열을 입력받음
	// 1. 띄어쓰기를 기준으로 단어를 나누어야 함
	// 2. 나누어진 단어별로 특수 문자를 없애주고 replace("")
	// 3.

	// ` ~ ! @ # $ % ^ & * ( ) _ - + = [ ] { } \ | : ; " ' , . < > ? / 은 금지
	// () 검색 가능
	// 제외되는 특수문자
//	private  String exRegExp = "!\"#[$]%&\\{\\}@`[*]:[+];-.<>,\\^~|'\\[\\]";
	private  String exRegExp ="[^0-9|a-z|A-Z|ㄱ-ㅎ|가-힣|ㅏ-ㅣ|()]*$";
	
	// 포함되어야 할 내용
	private String regExp = "[0-9|a-z|A-Z|ㄱ-ㅎ|가-힣|ㅏ-ㅣ|()]*$";
	
	// 문자열 -> 단어 ( 검색 조건을 만족하지 않는 문자 제거 )
	public List<String> fetchKeyword(String keywords) {
		
		List<String> words = new ArrayList<String>();
		List<String> result = new ArrayList<String>();
		// 문자열을 띄어쓰기로 나눔
		StringTokenizer st = new StringTokenizer(keywords, " ");
		while(st.hasMoreTokens()) {
			words.add(st.nextToken());
		}
		
		System.out.println(words.size());
		if(words.size() == 0)
			return null;
		
		for (String str : words) {
			if(!str.matches(regExp)) {
				// 검색 가능한 표현이 없으면...
				str = str.replaceAll(exRegExp, "");
				if(str.length() == 0) continue;
			}
			System.out.println(str);
			result.add(str);
		}
		System.out.println(result.size());
		return result;
	}
	

}
