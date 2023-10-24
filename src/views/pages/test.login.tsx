import * as React from 'react';  
//import Test from '../components/test';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Button, Input } from 'antd';
import { login } from '../../controllers/modules/login';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import axios_default from '../../../utils/axios';
const {LIFE_AT, LIFE_RT} = require("../../models/graphql/const")

export default class Main extends React.Component<any, any>   
{  
    constructor(props) {
        super(props);
        this.state = {
          username: props.username?props.username:"",
          password: props.password?props.password:""
        };
      }

    async handleLogin() {
        let rs = await login(this.state.username, this.state.password)
        let cookies = new Cookies()
        // if (rs.data.dangNhap.data) {
        //     if (rs.data.dangNhap.data.accessToken && rs.data.dangNhap.data.refreshToken) {
        //         cookies.set("token", rs.data.dangNhap.data.accessToken,{expires:  new Date(new Date().getTime() + LIFE_AT * 1000)})
        //         cookies.set("rToken", rs.data.dangNhap.data.refreshToken,{expires: new Date(new Date().getTime() + LIFE_RT * 1000)})
        //     }
        // }
        alert(JSON.stringify(rs.data.dangNhap.message))
    }
    async handleGet() {
        let rs = await axios_default.get("http://127.0.0.1:3301/getcookie",
    ).then(
        result => {
            console.log(result);
            return result.data
        }
    )
        alert((rs))
    }
    async handleSet() {
        let rs = await axios_default.get("http://127.0.0.1:3301/setcookie",
    ).then(
        result => {
            console.log(result);
            return result.data
        }
    )
    alert((rs))
    }
    render() {  

        return (
        <div>        
            <Input onInput={e=>this.setState({username: (e.target as HTMLInputElement).value})} placeholder="default size" prefix={<UserOutlined />} /><br/>
            <Input.Password placeholder="input password" onInput={e=>this.setState({password: (e.target as HTMLInputElement).value})}/>
            <Button onClick={async() => {
                await this.handleLogin()
            }}>Đăng nhập</Button>
             <Button onClick={async() => {
                await this.handleSet()
            }}>Set</Button>
             <Button onClick={async() => {
                await this.handleGet()
            }}>Get</Button>
        </div>
        
   ) }  
}  