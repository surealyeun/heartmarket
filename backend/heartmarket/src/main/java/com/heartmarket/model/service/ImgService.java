package com.heartmarket.model.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.multipart.MultipartFile;

import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.util.ResultMap;

public interface ImgService {

	public ResultMap<TradeImg> uploadFile(MultipartFile file, String path) throws IOException, Exception;

	public ResultMap<List<TradeImg>> uploadFiles(MultipartFile[] files, String path) throws Exception;
//	public ResultMap<TradeImg> test1(MultipartFile file, String path) throws Exception;
//	public ResultMap<List<TradeImg>> test2(MultipartFile[] files, String path) throws Exception;
}
