package com.heartmarket.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.model.service.ImgService;
import com.heartmarket.util.ResultMap;
import com.heartmarket.util.UploadFileUtils;

import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin("*")
public class ImageController {

	@Autowired
	TradeImgRepository tr;
	
	@Autowired
	ImgService is;
	
	private ResultMap<TradeImg> rm;
	private ResultMap<List<TradeImg>> rms;
	
//	@Resource(name = "uploadPath")
	String uploadPath = "C:\\Users\\multicampus\\Desktop\\ssafy\\Sub3-webmobile\\HeartMarket\\backend\\heartmarket\\src\\main\\webapp";
	
	@RequestMapping(value = "/img/upload", method = RequestMethod.POST)
	public ResponseEntity<Object> uploadFile(@RequestParam(value = "profile") MultipartFile file, HttpServletRequest req) throws IOException, Exception{
		
		String imgUploadPath = uploadPath + File.separator + "img";
		String ymdPath = UploadFileUtils.calcPath(imgUploadPath);

		String tPath = req.getSession().getServletContext().getRealPath("/");
		System.out.println("tPath : " + tPath);
		String fileName = null;
		
		System.out.println(imgUploadPath);
		System.out.println("1 : " + ymdPath);
			
		int fileIndex = file.getOriginalFilename().lastIndexOf('.')+1;
		String fileExtension = file.getOriginalFilename().toLowerCase().substring(fileIndex, file.getOriginalFilename().length());
		System.out.println("fileExtension : " + fileExtension);
		TradeImg tmp = new TradeImg();
		
		if(!((fileExtension.equals("jpg") || (fileExtension.equals("gif")) || (fileExtension.equals("png"))))) {
			return new ResponseEntity<Object>(new ResultMap<Object>("FAIL", "업로드 파일 형식이 다릅니다.", null), HttpStatus.NOT_FOUND);
		}
		if(file.getOriginalFilename() != null && file.getOriginalFilename() != "") {
			fileName = UploadFileUtils.fileUpload(imgUploadPath, file.getOriginalFilename(), file.getBytes(), ymdPath);
			tmp.setOrgImg(File.separator + "img" + ymdPath + File.separator + fileName);
//			tmp.setStoredImg(File.separator + "img" + ymdPath + File.separator + "s" + File.separator + "s_" + fileName);
		}else {
			fileName = File.separatorChar + "images" + File.separator + "none.png";
			tmp.setOrgImg(fileName);
//			tmp.setStoredImg(fileName);
		}
		
		tr.save(tmp);
		return new ResponseEntity<Object>(tmp, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/img/uploads", method = RequestMethod.POST)
	public ResponseEntity<Object> uploadFiles(@RequestParam /*List<MultipartFile>*/MultipartFile[] files,HttpServletRequest req) throws IOException, Exception{
		String imgUploadPath = uploadPath + File.separator + "img";
		String ymdPath = UploadFileUtils.calcPath(imgUploadPath);

		//Context root를 불러오는 부분
		String tPath = req.getSession().getServletContext().getRealPath("/");
		System.out.println("tPath : " + tPath);
		String fileName = null;
		
		System.out.println(imgUploadPath);
		System.out.println("1 : " + ymdPath);
		
//		List<MultipartFile> mList 
		List<TradeImg> fList = new ArrayList<>();
		if(files == null) {
			return new ResponseEntity<Object>(fList, HttpStatus.NOT_ACCEPTABLE);
		}
//		System.out.println(files.size());
		
		for (MultipartFile file : files) {
			int fileIndex = file.getOriginalFilename().lastIndexOf('.')+1;
			String fileExtension = file.getOriginalFilename().toLowerCase().substring(fileIndex, file.getOriginalFilename().length());
			System.out.println("fileExtension : " + fileExtension);
			TradeImg tmp = new TradeImg();
			
			if(!((fileExtension.equals("jpg") || (fileExtension.equals("gif")) || (fileExtension.equals("png"))))) {
				return new ResponseEntity<Object>(new ResultMap<Object>("FAIL", "업로드 파일 형식이 다릅니다.", null), HttpStatus.NOT_FOUND);
			}
			if(file.getOriginalFilename() != null && file.getOriginalFilename() != "") {
				fileName = UploadFileUtils.fileUpload(imgUploadPath, file.getOriginalFilename(), file.getBytes(), ymdPath);
				tmp.setOrgImg(File.separator + "img" + ymdPath + File.separator + fileName);
//				tmp.setStoredImg(File.separator + "img" + ymdPath + File.separator + "s" + File.separator + "s_" + fileName);
			}else {
				fileName = File.separatorChar + "images" + File.separator + "none.png";
				tmp.setOrgImg(fileName);
//				tmp.setStoredImg(fileName);
			}
			
			fList.add(tmp);
		}
		System.out.println("size : " + fList.size());
		tr.saveAll(fList);
//		return new ResponseEntity<Object>(new ResultMap<TradeImg>("SUCCESS", "다중 파일 업로드", fList), HttpStatus.OK);
		return new ResponseEntity<Object>(fList, HttpStatus.OK);

	}
	
	@RequestMapping(value = "/file", method = RequestMethod.POST)
	public ResponseEntity<Object> testUpload(@RequestParam(required = false) MultipartFile file, HttpServletRequest req) throws Exception{
		String uploadPath = req.getSession().getServletContext().getRealPath("/");
		try {
			rm = is.uploadFile(file, uploadPath,"profile");
			if(rm.getData() != null) {
				tr.save(rm.getData());
				return new ResponseEntity<Object>(rm, HttpStatus.OK);
			}
			else
				return new ResponseEntity<Object>(rm, HttpStatus.NOT_ACCEPTABLE);
				
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
	
	@ApiOperation(value = "파일 이미지 여러개 올리기")
	@RequestMapping(value = "/files", method = RequestMethod.POST, consumes = "multipart/form-data")
	public ResponseEntity<Object> testUpload(@RequestParam(required = false) MultipartFile[] files, HttpServletRequest req) throws Exception{
//		String uploadPath = req.getSession().getServletContext().getRealPath("/");
		String uploadPath = "/home/ubuntu";
		try {
			rms = is.uploadFiles(files, uploadPath, "profile");
			if(rms.getData() != null) {
				tr.saveAll(rms.getData());
				return new ResponseEntity<Object>(rms, HttpStatus.OK);
			}
			else
				return new ResponseEntity<Object>(rms, HttpStatus.NOT_ACCEPTABLE);
				
		}catch(Exception e) {
			e.printStackTrace();
			throw e;
		}
	}
}
