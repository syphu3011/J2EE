import * as React from 'react';  
import Test from '../components/test';
import axios from 'axios';
export default class Main extends React.Component<any, any>   
{  
    so() {
        axios.post
    }
    render() {  
        return (
        <>
            <div>  
        <h2>Hello React with TypeScript</h2>  
        <Test/>
            </div>
        </>)
        
    }  
}  