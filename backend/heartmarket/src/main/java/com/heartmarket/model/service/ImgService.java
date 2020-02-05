package com.heartmarket.model.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.util.ResultMap;

public interface ImgService {
	
	public ResultMap<Object> uploadFile(MultipartFile file)  throws IOException, Exception;
	public List<TradeImg> uploadFiles(MultipartFile[] files);
}
