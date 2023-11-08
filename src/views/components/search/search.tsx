import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import {SearchOutlined} from "@ant-design/icons";
import productData from "../product/productData";
export const SearchItem = ({setResults})=>{
     const [input,setInput] = useState("");
     const getData = (value)=>{
          const results = productData.filter((item) => {
               return value && item.name && item.name.toLowerCase().includes(value);
             }).slice(0, 5);
             setResults(results);
           };
     
     const handleChange=(value)=>{
          setInput(value);
          getData(value);
          
     }
     return(
               <div>
                    <Form action="" className="search-form">
                         {/* <SearchOutlined className="large-icon btn-Search" style={{fontSize:'25px',marginTop:'5px',textAlign:'center'}}/> */}
                         <Input addonBefore={<SearchOutlined className="large-icon btn-Search" style={{fontSize:'25px',marginTop:'5px',textAlign:'center'}}/>
} value={input.toLowerCase()} onChange={(e)=>handleChange(e.target.value)} placeholder="Tìm kiếm ở đây..." id="search-box"/>
                         {/* <Button htmlType="submit" id="btn-Search"><SearchOutlined className="large-icon" style={{fontSize:'25px',marginTop:'5px',textAlign:'center'}}/></Button> */}
                    </Form>
               </div>
          )
}