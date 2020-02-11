import React, { Component } from "react";
import "./Write.scss";
import axios from "axios";
// import { Upload, Button, Icon, } from 'antd';
// import 'antd/dist/antd.css';
//npm install antd --save
//https://gary-shen.github.io/ant-design/components/upload/

import Header from "../Common/Header";
import Nav from "../Common/Nav";
import TopButton from "../Common/TopButton";
import Footer from "../Common/Footer";

class Write extends Component {
  user = JSON.parse(window.localStorage.getItem("user") || "{}");

  state = {
    title: "",
    explain: "",
    price:"",
    category: 1,
    images: [],
    filekey: 0
  };

  setStateAsync(state: object) {
    return new Promise(resolve => {
      this.setState(state, resolve);
    });
  }
  //이미지 여러개 업로드
  InputChange = (e: any) => {
    if (e.target.name !== "images") {
      this.setState({
        [e.target.name]: e.target.value
      });
    } else {
      let number = e.target.files?.length;
      if (number !== undefined) {
        if (number > 5) {
          alert("파일은 최대 5개까지 업로드 가능합니다.");
          this.setState({
            filekey: this.state.filekey + 1
          });
        } else {
          this.setStateAsync({
            images: e.target.files
          });
          console.log(this.state.images);
        }
      }
    }
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    
        axios({
            method: "post",
            url: "http://13.125.55.96:8080/trade/add",
            params: {
              user: this.user.id,
              title: this.state.title,
              price: this.state.price,
              explain: this.state.explain,
              category: this.state.category,
              images: this.state.images
            }
        })
            .then(res => {
                console.log(res.data.data);
            })
            .catch(error => {
                console.log(error);
                console.log(this.state);
                alert("아이디와 비밀번호를 확인해주세요.");
            });
        e.preventDefault();

};

  render() {
    return (
      <>
        <div className="Write">
          <Header></Header>
          <Nav></Nav>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                className="write_input half"
                value={this.user.uarea[0].address}
                type="text"
                readOnly
              ></input>
              <select
                className="write_input half2"
                name="category"
                onChange={e => this.InputChange(e)}
              >
                <option value={1}>카테고리1</option>
                <option value={2}>카테고리2</option>
                <option>카테고리3</option>
                <option>카테고리4</option>
                <option>카테고리5</option>
                <option>카테고리6</option>
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
                placeholder="가격을 입력해주세요."
                onChange={e => this.InputChange(e)}
                required
              ></input>
              <textarea
                className="write_input textarea"
                name="explain"
                placeholder="상품 설명을 입력해주세요"
                onChange={e => this.InputChange(e)}
                required
              ></textarea>
              <div className="filebox">
                <label>제품 사진 업로드
                <input
                  key={this.state.filekey}
                  className="write_input"
                  multiple
                  id="ex_file"
                  type="file"
                  name="images"
                  onChange={e => this.InputChange(e)}
                  required
                />
                </label>
                {this.state.images.length}개의 사진이 업로드 되었습니다.
              </div>
              {this.state.images.length === 0? "" : (<div>
              <button>등록</button>
              <button>취소</button>
              </div>)}
              
              <button>등록</button>
              <button>취소</button>
            </div>
          </form>
          <TopButton></TopButton>
        </div>
        <Footer></Footer>
      </>
    );
  }
}
export default Write;
