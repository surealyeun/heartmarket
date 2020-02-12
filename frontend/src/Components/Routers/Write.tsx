import React, { Component } from "react";
//import {withRouter} from 'react-router-dom'
import { Redirect } from "react-router";
import "./Write.scss";
import axios from "axios";
import Header from "../common/Header";
import Nav from "../common/Nav";
import TopButton from "../common/TopButton";
import Footer from "../common/Footer";

class Write extends Component {
  user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
  state = {
    title: "",
    explain: "",
    price: "",
    category: "1",
    images: [],
    filekey: 0,
    base64: [],
    success: ""
  };

  //이미지 여러개 업로드
  InputChange = (e: any) => {
    //같은 이미지를 연속으로 선택하는 게 막혀있어서 바꾼 코드
    this.setState({
      filekey: this.state.filekey + 1
    });
    //input 값 변경 감지해 설정
    if (e.target.name !== "images") {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    //이미지일때는 다르게 설정
    else {
      let number = e.target.files?.length;
      //파일이 선탯되었을 때
      if (number !== undefined && number !== 0) {
        if (number + this.state.images.length > 5) {
          alert("파일은 최대 5개까지 업로드 가능합니다.");
        }
        //이미지 파일 기존배열에 추가해주기
        else {
          var image = this.state.images;
          for (var i = 0; i < number; i++) {
            let file = e.target.files[i];
            image = image.concat(file);
          }
          this.setState({
            images: image
          });
          //이미지 변경 함수 호출
          for (var j = this.state.images.length; j < image.length; j++) this.ChangeImage(image[j]);
        }
      }
    }
  };

  //이미지 변경됐을 때 프리뷰
  ChangeImage = (e: any) => {
    let reader = new FileReader();
    reader.onloadend = e => {
      // 2. 읽기가 완료되면 아래코드가 실행
      const base64 = reader.result; //reader.result는 이미지를 인코딩(base64 ->이미지를 text인코딩)한 결괏값이 나온다.
      if (base64) {
        this.setState({
          base64: [...this.state.base64, base64.toString()] // 파일 base64 상태 업데이트
        });
      }
    };
    if (e) {
      reader.readAsDataURL(e); // 1. 파일을 읽어 버퍼에 저장합니다. 저장후 onloadend 트리거
    }
  };

  //이미지 삭제하기
  RemoveImg = (e: any) => {
    let forward = this.state.images.slice(0, e.target.id);
    let back = this.state.images.slice(
      Number(e.target.id) + 1,
      this.state.base64.length
    );

    let forward64 = this.state.base64.slice(0, e.target.id);
    let back64 = this.state.base64.slice(
      Number(e.target.id) + 1,
      this.state.base64.length
    );

    this.setState({
      images: forward.concat(back),
      base64: forward64.concat(back64)
    });
  };

  //글쓰기 보내기
  handleSubmit = (e: any) => {
    if (this.state.title.trim() === "") {
      alert("제목을 입력해주세요!");
      return;
    } else if (this.state.price === "") {
      alert("가격을 입력해주세요!");
      return;
    } else if (this.state.explain === "") {
      alert("내용을 입력해주세요!");
      return;
    } else if (this.state.images.length === 0) {
      alert("최소 1개의 이미지를 입력해주세요!");
      return;
    }

    let files: File[];
    files = this.state.images;
    let tradeTitle = this.state.title;
    let tradeCategory = this.state.category;
    let productPrice = this.state.price;
    let userNo: string = this.user.userNo;
    let tradeArea: string = this.user.uarea[0].address;
    let productInfo = this.state.explain;
    let formdata = new FormData();
    formdata.append("tradeTitle", tradeTitle);
    formdata.append("tradeCategory", tradeCategory);
    formdata.append("productPrice", productPrice);
    formdata.append("userNo", userNo);
    formdata.append("tradeArea", tradeArea);
    formdata.append("productInfo", productInfo);
    for (let i = 0; i < files.length; i++) {
      formdata.append("files", files[i]);
    }
    axios({
      method: "POST",
      url: "http://13.125.55.96:8080/trade/add",
      headers: { "content-type": "multipart/form-data" },
      data: formdata
    })
      .then(res => {
        console.log(res.data.data[0].tiTrade.tradeNo);
        this.setState({
          success: "search/detail/" + res.data.data[0].tiTrade.tradeNo
        });
      })
      .catch(error => {
        alert(error);
      });
  };

  render() {
    if (this.state.success) {
      alert("글이 작성되었습니다")
      return <Redirect to={this.state.success}></Redirect>
    }
    return (
      <>
        <Header></Header>
        <Nav></Nav>
        <div className="Write">
          <div>
            <input
              className="write_address"
              value={this.user.uarea[0].address}
              type="text"
              readOnly
            ></input>
            <select
              className="write_category"
              name="category"
              onChange={e => this.InputChange(e)}
            >
              <option value={"1"}>디지털/가전</option>
              <option value={"2"}>가구/인테리어</option>
              <option value={"3"}>유아동/유아도서</option>
              <option value={"4"}>생활/가공식품</option>
              <option value={"5"}>여성의류</option>
              <option value={"6"}>여성잡화</option>
              <option value={"7"}>뷰티/미용</option>
              <option value={"8"}>남성패션/잡화</option>
              <option value={"9"}>스포츠/레저</option>
              <option value={"10"}>게임/취미</option>
              <option value={"11"}>도서/티켓/음반</option>
              <option value={"12"}>반려동물용품</option>
              <option value={"13"}>기타중고물품</option>
            </select>
            <input
              className="write_input"
              name="title"
              type="text"
              placeholder="글 제목을 입력해주세요."
              onChange={e => this.InputChange(e)}
              required
            ></input>
            <input
              className="write_input"
              name="price"
              type="number"
              min="0"
              placeholder="가격을 입력해주세요."
              onChange={e => this.InputChange(e)}
              required
            ></input>
            <textarea
              className="textarea"
              name="explain"
              placeholder="상품 설명을 입력해주세요"
              onChange={e => this.InputChange(e)}
              required
            ></textarea>
            <div className="filebox">
              <label>
                제품 사진 업로드
                <input
                  key={this.state.filekey}
                  className="write_input"
                  multiple
                  id="ex_file"
                  type="file"
                  name="images"
                  onChange={e => this.InputChange(e)}
                />
              </label>
              <div className="write_filenum">
                {this.state.images.length}개의 사진이 업로드 되었습니다.
              </div>
            </div>

            <div>
              {this.state.base64[0] && (
                <div className="preview_div">
                  <img
                    alt="삭제"
                    src="https://image.flaticon.com/icons/svg/458/458595.svg"
                    className="X"
                    id="0"
                    onClick={e => this.RemoveImg(e)}
                  />
                  <img
                    className="image_preview"
                    alt="img1"
                    src={this.state.base64[0]}
                  />
                </div>
              )}
              {this.state.base64[1] && (
                <div className="preview_div">
                  <img
                    alt="삭제"
                    src="https://image.flaticon.com/icons/svg/458/458595.svg"
                    className="X"
                    id="1"
                    onClick={e => this.RemoveImg(e)}
                  />
                  <img
                    className="image_preview"
                    alt="img2"
                    src={this.state.base64[1]}
                  />
                </div>
              )}
              {this.state.base64[2] && (
                <div className="preview_div">
                  <img
                    alt="삭제"
                    src="https://image.flaticon.com/icons/svg/458/458595.svg"
                    className="X"
                    id="2"
                    onClick={e => this.RemoveImg(e)}
                  />
                  <img
                    className="image_preview"
                    alt="img2"
                    src={this.state.base64[2]}
                  />
                </div>
              )}
              {this.state.base64[3] && (
                <div className="preview_div">
                  <img
                    alt="삭제"
                    src="https://image.flaticon.com/icons/svg/458/458595.svg"
                    className="X"
                    id="3"
                    onClick={e => this.RemoveImg(e)}
                  />
                  <img
                    className="image_preview"
                    alt="img2"
                    src={this.state.base64[3]}
                  />
                </div>
              )}
              {this.state.base64[4] && (
                <div className="preview_div">
                  <img
                    alt="삭제"
                    src="https://image.flaticon.com/icons/svg/458/458595.svg"
                    className="X"
                    id="4"
                    onClick={e => this.RemoveImg(e)}
                  />
                  <img
                    className="image_preview"
                    alt="img2"
                    src={this.state.base64[4]}
                  />
                </div>
              )}
            </div>

            <button onClick={this.handleSubmit}>등록</button>
            <button>취소</button>
          </div>
        </div>
        <TopButton></TopButton>
        <Footer></Footer>
      </>
    );
  }
}

//export default withRouter(Write);
export default Write;
