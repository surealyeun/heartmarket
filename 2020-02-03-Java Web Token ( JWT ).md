# Java Web Token ( JWT )

#### 기본 구조 ( Architecture )

##### 1. Header ( JWT 웹 토큰의 헤더 정보 )

- typ : 토큰의 타입, JWT만 존재
- alg : 해싱 알고리즘 ( HMAC SHA256 또는 RSA )
  - 헤더를 암호화 하는게 아니다. 토큰 검증시 사용.

```
{
	"alg" : "HS256",
	"typ" : "JWT"
}
```

##### 2. Payload

- 실제 토큰으로 사용하려는 데이터가 담기는 부분, 각 데이터를 Claim이라고 하며 다음과 같이 3가지 종류가 있다
- `Reserved claims` : 이미 예약된 Claim. 필수는 아니지만 사용하길 권장. key는 모두 3자리 String이다.
  - iss (String) : issuer, 토큰 발행자 정보
  - exp (Number) : expiration time, 만료일
  - sub (String) : subject, 제목
  - aud (String) : audience
  - [More](https://tools.ietf.org/html/draft-jones-json-web-token-07#section-4.1)

- `Public claims` : 사용자 정의 Claim.
  - Public 이라는 이름처럼 공개용 정보
  - 충돌 방지를 위해 URI 포맷을 이용해 저장한다.
- `Private claims` : 사용자 정의 Claim
  - Public claims 와 다르게 사용자가 임의로 정한 정보
  - 아래와 같이 일반 정보를 저장한다.

```
{
	"name" : "hak",
	"age" : 26
}
```

##### 3. Signature