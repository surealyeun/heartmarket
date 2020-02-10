<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>
#preview img {
	width: 100px;
	height: 100px;
}

#preview p {
	text-overflow: ellipsis;
	overflow: hidden;
}

.preview-box {
	border: 1px solid;
	padding: 5px;
	border-radius: 2px;
	margin-bottom: 10px;
}
</style>
</head>
<body>
	<h1>테스트 확인</h1>
	<form method="get" action="view">
		<input type="email" name="email" id="email" /> <input type="password"
			name="password" id="password" /> <br />
		<button type="submit">Submit</button>
	</form>

	<div id="attach">
		<label class="waves-effect waves-teal btn-flat" for="uploadInputBox">사진첨부</label>
		<input id="uploadInputBox" style="display: none" type="file"
			name="filedata" multiple />
	</div>
	<div id="preview" class="content"></div>
	<div class="inputArea">
		<label for="gdsImg">이미지</label> <input multiple="multiple" type=file
			id="gdsImg" name="file" />

		<script>
			$("#gdsImg").change(function()){
				if(this.files && this.file[0]){
					var reader = new FileReader;
					reader.onload = function(data){
						$(".select_img").attr("src", data.target.result).width(500);
					}
					reader.readAsDataURL(this.files[0]);
				}
			});
		</script>
	</div>

	<div class="footer">
		<button class="submit">
			<a href="#" title="등록" class="btnlink">등록</a>
		</button>
	</div>

	<div><%=request.getRealPath("/")%></div>
</body>
<script>
	function mm(){
		let email = document.getElementById("email").value;
		let pw = document.getElementById("password").value;

		console.log(this);
		console.log(email);
		console.log(pw)
		
		
	}
	
	function addPreview(input){
		if (input[0].files) {
            //파일 선택이 여러개였을 시의 대응
            for (var fileIndex = 0; fileIndex < input[0].files.length; fileIndex++) {
                var file = input[0].files[fileIndex];

                if (validation(file.name))
                    continue;

                var reader = new FileReader();
                reader.onload = function(img) {
                    //div id="preview" 내에 동적코드추가.
                    //이 부분을 수정해서 이미지 링크 외 파일명, 사이즈 등의 부가설명을 할 수 있을 것이다.
                    var imgNum = previewIndex++;
                    $("#preview")
                            .append(
                                    "<div class=\"preview-box\" value=\"" + imgNum +"\">"
                                            + "<img class=\"thumbnail\" src=\"" + img.target.result + "\"\/>"
                                            + "<p>"
                                            + file.name
                                            + "</p>"
                                            + "<a href=\"#\" value=\""
                                            + imgNum
                                            + "\" onclick=\"deletePreview(this)\">"
                                            + "삭제" + "</a>" + "</div>");
                    files[imgNum] = file;
                };
                reader.readAsDataURL(file);
            }
        } else
            alert('invalid file input'); // 첨부클릭 후 취소시의 대응책은 세우지 않았다.
	}
</script>
</html>