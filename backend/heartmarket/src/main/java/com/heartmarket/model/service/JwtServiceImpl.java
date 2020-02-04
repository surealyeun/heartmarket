package com.heartmarket.model.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Service
public class JwtServiceImpl implements JwtService {
	
	private String secretKey = "HeartMarketSecretKeyUsingJwtForSpringBootTEST";
	private byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(secretKey);
	private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
	private final Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
	
	private Logger logger = LoggerFactory.getLogger(JwtServiceImpl.class);
	
	@Override
	public String makeJwt(HttpServletRequest req) throws Exception {
        Date expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + 1000 * 60 * 5);

        Map<String, Object> headerMap = new HashMap<String, Object>();

        headerMap.put("typ","JWT");
        headerMap.put("alg","HS256");

        Map<String, Object> map= new HashMap<String, Object>();

        String email = req.getParameter("email");
        String password = req.getParameter("password");

        map.put("email", email);
        map.put("password", password);

        JwtBuilder builder = Jwts.builder().setHeader(headerMap)
                .setClaims(map)
                .setExpiration(expireTime)
                .signWith(signingKey, signatureAlgorithm);

        return builder.compact();
	}

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

//	@Override
//	public String getUserEmail(String jwt) throws Exception {
//		try {
//			Jws<Claims> claims = Jwts.parser().setSigningKey(signingKey)
//					.parseClaimsJws(jwt);
//			return claims.getBody().getSubject();
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//			return null;
//		}
//	}
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
