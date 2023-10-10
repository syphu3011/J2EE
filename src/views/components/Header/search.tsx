import { Button, Form, Input } from "antd";
import React from "react";
import {SearchOutlined} from "@ant-design/icons";
export default class SearchItem extends React.Component{
     render(){
          return(
               <div>
                    <Form action="" className="search-form">
                         <Input type="search" name=" " placeholder="Tìm kiếm ở đây..." id="search-box"/>
                         <Button id="btn-Search"><SearchOutlined className="large-icon" style={{fontSize:'25px',marginTop:'5px',textAlign:'center'}}/></Button>
                    </Form>
               </div>
          )
     }
}