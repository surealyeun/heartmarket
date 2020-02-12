<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>테스트 확인</h1>
	<form method="post">
		<input type="email" name="email" id="email"/>
		<input type="password" name="password" id="password" />
		<br/>
		<button type="submit" onclick="mm()">Submit</button>
	</form>
</body>
<script>
	function mm(){
		let email = document.getElementById("email").value;
		let pw = document.getElementById("password").value;

		console.log(this);
		console.log(email);
		console.log(pw)
	}
</script>
</html>