import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import {SearchOutlined} from "@ant-design/icons";
import {getProductData} from "../product/productData";
export const SearchItem = ({setResults})=>{
     const [input,setInput] = useState("");
     const getData = async (value)=>{
          const results = (await getProductData("data")).filter((item) => {
               return value && item.ten && item.ten.toLowerCase().includes(value);
             }).slice(0, 5);
             setResults(results);
           };
     
     const handleChange=async (value)=>{
          setInput(value);
          await getData(value);
          
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