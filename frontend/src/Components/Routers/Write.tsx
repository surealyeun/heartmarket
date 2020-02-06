import React from "react";
import "./Write.scss";

import { Upload, message, Button, Icon, } from 'antd';
import 'antd/dist/antd.css';

//npm install antd --save
//https://gary-shen.github.io/ant-design/components/upload/
function Write() {

    
const props = {
    // name: 'file',
    // action: '//jsonplaceholder.typicode.com/posts/',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    onChange(info:any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

    return (
        <div>
            <h1>3</h1>
            <Upload>
                <Button>
                    <Icon type="upload" /> Click to Upload
            </Button>
            </Upload>

            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> Upload
                </Button>
            </Upload>
        </div>
    );
}

export default Write;