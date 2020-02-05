<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div id="root">

		<div id="container_box">
			<h2>상품 조회</h2>

			<form role="form" method="post" autocomplete="off">

				
				<div class="inputArea">
					<label for="gdsDes">상품소개</label>

					<div class="gdsDes">${goods.imgNo}</div>

				</div>
 
				<div class="inputArea">
					<label for="gdsImg">이미지</label>
					<p>원본 이미지</p>
					<img src="${goods.orgImg}" class="oriImg" />

					<p>썸네일</p>
					<img src="${goods.storedImg}" class="thumbImg" />
				</div>

				<div class="inputArea">
					<button type="button" id="modify_Btn" class="btn btn-warning">수정</button>
					<button type="button" id="delete_Btn" class="btn btn-danger">삭제</button>

				
				</div>

			</form>

		</div>


	</div>

</body>
</html>