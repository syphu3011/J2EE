import * as React from 'react';  
import { getProducts, getProductsWithAllCategory } from "../controllers/modules/customer/products";

export default class Coding_ok extends React.Component<any, any>   
{   
    constructor(props) {
        super(props);
        this.state = {
            test: ""
        }
    }   
    componentDidMount () {
        getProductsWithAllCategory().then(rs => this.setState({
            test: rs
        }))
    }
    render() {  
        
        return (
            <div >
               {JSON.stringify(this.state.test)} 
          </div>
        
   ) }  
}  