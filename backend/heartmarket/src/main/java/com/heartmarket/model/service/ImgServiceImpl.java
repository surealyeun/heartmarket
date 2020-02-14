package com.heartmarket.model.service;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.util.ResultMap;
import com.heartmarket.util.UploadFileUtils;

@Service
public class ImgServiceImpl implements ImgService {

	@Autowired
	TradeImgRepository tr;

	public TradeImg upload(MultipartFile file, String uploadPath, String deli) throws IOException, Exception {

		String imgUploadPath = uploadPath+File.separator+deli;
		String ymdPath = UploadFileUtils.calcPath(imgUploadPath);

		String fileName = null;

		TradeImg tmp = new TradeImg();
		System.out.println(file);
		if (file != null) {
			int fileIndex = file.getOriginalFilename().lastIndexOf('.') + 1;
			String fileExtension = file.getOriginalFilename().toLowerCase().substring(fileIndex,
					file.getOriginalFilename().length());
			if (!(fileExtension.equals("jpg") || fileExtension.equals("gif") || fileExtension.equals("png"))) {
				return null;
			}
			fileName = UploadFileUtils.fileUpload(imgUploadPath, file.getOriginalFilename(), file.getBytes(), ymdPath);
			tmp.setOrgImg(File.separator + deli + ymdPath + File.separator + fileName);
		} else {
			fileName = File.separatorChar + deli + File.separator + "none.png";
			tmp.setOrgImg(fileName);
//			tmp.setStoredImg(fileName);
		}
		return tmp;
	}

	@Override
	public ResultMap<TradeImg> uploadFile(MultipartFile file, String path,String deli) throws Exception{
		try {
			TradeImg tig = upload(file, path, deli);
//			if(tig.getOrgImg().endsWith("none.png") || tig.getStoredImg().endsWith("none.png")) {
//				return new ResultMap<TradeImg>("FAIL", "업로드 할 파일이 없습니다.", null);
//			}
			return new ResultMap<TradeImg>("SUCCESS", "파일 업로드 완료", tig);
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	@Override
	public ResultMap<List<TradeImg>> uploadFiles(MultipartFile[] files, String path, String deli) throws Exception{
		List<TradeImg> tList= Arrays.asList(files)
				.stream()
				.map(file -> {
					try {
						return upload(file, path, deli);
					} catch (Exception e) {
						e.printStackTrace();
						return null;
					}
				})
				.collect(Collectors.toList());
		return new ResultMap<List<TradeImg>>("SUCCESS", "파일 업로드 완료", tList);
	}


	// 단일 이미지 업로드 ( 프로필 )
	/*
	 * @Override public ResultMap<TradeImg> uploadFile(MultipartFile file,
	 * HttpServletRequest req) throws IOException, Exception { String uploadPath =
	 * req.getSession().getServletContext().getRealPath("/");
	 * 
	 * String imgUploadPath = uploadPath + File.separator + "img"; String ymdPath =
	 * UploadFileUtils.calcPath(imgUploadPath);
	 * 
	 * String fileName = null;
	 * 
	 * System.out.println(imgUploadPath); System.out.println(ymdPath);
	 * 
	 * TradeImg tmp = new TradeImg(); if (!(file == null)) { int fileIndex =
	 * file.getOriginalFilename().lastIndexOf('.') + 1; String fileExtension =
	 * file.getOriginalFilename().toLowerCase().substring(fileIndex,
	 * file.getOriginalFilename().length()); System.out.println("File name : " +
	 * file.getOriginalFilename());
	 * 
	 * if (!((fileExtension.equals("jpg") || (fileExtension.equals("gif") ||
	 * (fileExtension.equals("png")))))) { return new ResultMap<TradeImg>("FAIL",
	 * "업로드 파일 형식이 다릅니다.", null); } fileName =
	 * UploadFileUtils.fileUpload(imgUploadPath, file.getOriginalFilename(),
	 * file.getBytes(), ymdPath); tmp.setOrgImg(File.separator + "img" + ymdPath +
	 * File.separator + fileName); tmp.setStoredImg( File.separator + "img" +
	 * ymdPath + File.separator + "s" + File.separator + "s_" + fileName); } else {
	 * fileName = File.separatorChar + "images" + File.separator + "none.png";
	 * tmp.setOrgImg(fileName); tmp.setStoredImg(fileName); } return new
	 * ResultMap<TradeImg>("SUCCESS", "파일 업로드 성공.", tmp); }
	 * 
	 * // 다중 이미지 업로드 ( 게시글 )
	 * 
	 * @Override public List<TradeImg> uploadFiles(MultipartFile[] files) { return
	 * null; }
	 */
}
