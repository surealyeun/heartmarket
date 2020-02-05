package com.heartmarket.controller;

import java.io.File;
import java.io.IOException;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.heartmarket.model.dao.TradeImgRepository;
import com.heartmarket.model.dto.TradeImg;
import com.heartmarket.util.ResultMap;
import com.heartmarket.util.UploadFileUtils;

@RestController
@CrossOrigin("*")
public class ImageController {

	@Autowired
	TradeImgRepository tr;
	
//	@Resource(name = "uploadPath")
	String uploadPath = "C:\\Users\\multicampus\\Desktop\\ssafy\\Sub3-webmobile\\HeartMarket\\backend\\heartmarket\\src\\main\\webapp";
	
	@RequestMapping(value = "/img/upload", method = RequestMethod.POST)
	public ResponseEntity<Object> uploadFile(@RequestParam MultipartFile file) throws IOException, Exception{
		
		String imgUploadPath = uploadPath + File.separator + "img";
		String ymdPath = UploadFileUtils.calcPath(imgUploadPath);

		String fileName = null;
		
		System.out.println(imgUploadPath);
		System.out.println("1 : " + ymdPath);
		
		int fileIndex = file.getOriginalFilename().lastIndexOf('.')+1;
		String fileExtension = file.getOriginalFilename().toLowerCase().substring(fileIndex, file.getOriginalFilename().length());
		
		TradeImg tmp = new TradeImg();
		
		if(!((fileExtension=="jpg") || (fileExtension=="gif") || (fileExtension == "png"))) {
			return new ResponseEntity<Object>(new ResultMap<Object>("FAIL", "업로드 파일 형식이 다릅니다.", null), HttpStatus.NOT_FOUND);
		}
		if(file.getOriginalFilename() != null && file.getOriginalFilename() != "") {
			fileName = UploadFileUtils.fileUpload(imgUploadPath, file.getOriginalFilename(), file.getBytes(), ymdPath);
			tmp.setOrgImg(File.separator + "img" + ymdPath + File.separator + fileName);
			tmp.setStoredImg(File.separator + "img" + ymdPath + File.separator + "s" + File.separator + "s_" + fileName);
		}else {
			fileName = File.separatorChar + "images" + File.separator + "none.png";
			tmp.setOrgImg(fileName);
			tmp.setStoredImg(fileName);
		}
		
		tr.save(tmp);
		return new ResponseEntity<Object>(tmp, HttpStatus.OK);
	}
}
