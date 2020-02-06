package com.heartmarket.model.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.util.ResultMap;

public interface ImgService {
	
	public ResultMap<TradeImg> uploadFile(MultipartFile file, HttpServletRequest req)  throws IOException, Exception;
	public List<TradeImg> uploadFiles(MultipartFile[] files);
}
