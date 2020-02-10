package com.heartmarket.model.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.heartmarket.model.dto.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtServiceImpl implements JwtService {
	
	private UserDetailsService userDetailService;
	
	@Value(value = "${jwt.secretkey.heartmarket}")
	private String secretKey;
	
	private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
	private byte[] apiKeySecretBytes;
	private Key signingKey;
	private Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);

	@PostConstruct
	public void init() {
		apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
		signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
	}
	@Override
	public String makeJwt(User user) throws Exception {
		// 발급된 시간
        Date iat = new Date();
        Date expireTime = new Date();
        expireTime.setTime(iat.getTime() + 1000 * 60 * 60);
        
        // JWT의 헤더 정보
        Map<String, Object> headerMap = new HashMap<String, Object>();
        headerMap.put("typ","JWT");
        headerMap.put("alg","HS256");

        //정보(claims)를 위한 map 변수
        Map<String, Object> map= new HashMap<String, Object>();

        String email = user.getEmail();
        String nickname = user.getNickname();
        int userNo = user.getUserNo();
        
        map.put("userno", userNo);

        JwtBuilder builder = Jwts.builder().setHeader(headerMap)
        		.setIssuer("heartmarket.com")
        		.setIssuedAt(iat)
        		.setExpiration(expireTime)
        		.setSubject(email)
        		.setAudience(nickname)
                .setClaims(map)
                .signWith(signingKey, signatureAlgorithm);

        return builder.compact();
	}

	// Jwt 토큰의 유효성 + 만료일자 확인
	@Override
	public boolean checkJwt(String jwt) throws Exception {
		try {
            Claims claims = Jwts.parser().setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                    .parseClaimsJws(jwt).getBody(); // 정상 수행된다면 해당 토큰은 정상토큰
            logger.info("expireTime :" + claims.getExpiration());
            logger.info("email :" + claims.get("email"));
            logger.info("password :" + claims.get("password"));
            return true;
        } catch (ExpiredJwtException exception) {
            logger.info("토큰 만료");
            return false;
        } catch (JwtException exception) {
            logger.info("토큰 변조");
            return false;
        }
	}
	
	//Request의 Header에서 token 파싱 : "token"
	@Override
	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("token");
	}
	
	// Jwt 토큰으로 인증 정보를 조회
	@Override
	public Authentication getAuthentication(String token) {
		UserDetails userDetails = userDetailService.loadUserByUsername(this.getUserEmail(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	@Override
	public String getUserEmail(String jwt) {
		try {
			return Jwts.parser().setSigningKey(signingKey)
					.parseClaimsJws(jwt).getBody().getSubject();
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
//
//	@Override
//	public String getUserUID(String jwt) throws Exception {
//		try {
//			Jws<Claims> claims = Jwts.parser().setSigningKey(signingKey)
//					.parseClaimsJws(jwt);
//			// Cast to String
//			return claims.getBody().get("uid")+"";
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}

}
