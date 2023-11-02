import { Button, Card, Col, Row, Select, Typography,Image, Pagination } from "antd";
import React from "react";
import AddToCartButton from "../cart/addToCartButton";
import { Link } from "react-router-dom";
import productData from "./productData";
interface ProductProps{
 // category?:string;
}
interface ProductState{
  minValue:number,
  maxValue: number,
}
export default class Product extends React.PureComponent<ProductProps,ProductState>{
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 8,
      
    };
  }
  
  handleChange = value => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 8
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 8
      });
    }
  };
  render(){
  //const {  category } = this.props;
  const numEachPage = 8

    /*const filteredProducts = productData.filter(
      (product) => product.category === category
    );*/
  return(
    <div className="product-container">
        <div className="title-product">
            <h2>{productData[0].category}</h2>
            <div className="title-swap-product">
              <Typography.Text>Sắp xếp </Typography.Text>
              <Select 
              defaultValue={"low-high"}
                      options={[
                        {
                          label:"Giá thấp đến cao",
                          value:"low-high",
                        },
                        {
                          label:"Giá cao đến thấp",
                          value:"hight-low"
                        }
                      ]}
              ></Select>
            </div>
        </div>
        <div className="content-product">
          <div className="product-content-container">
            {
              productData && productData.length>0 && 
                                   productData.slice(this.state.minValue,this.state.maxValue)
                                   /*filteredProducts
                                   .filter(
                                     (product) =>
                                       product.id >= this.state.minValue && product.id <= this.state.maxValue
                                   )*/.map((product)=>(
                                        <div>
                                        <Card key={product.id} className="card_1">
                                        <Link to={`/products/${product.id}/${product.name}`}>

                                                  <Image src={product.image[0]} className="image-card"></Image> <br/>
                                                  <h4>{product.name}</h4>
                                                  <p>{product.price.toLocaleString()} VND</p>
                                          </Link>
                                                  <AddToCartButton item={product} selectedColor={product.color[0]} selectedSize={product.size[0]} amount={1}/>
                                             
                                                  
                                             
                                          
                                        </Card>
                                        
                                        </div>
                                   ))
                              }
              </div>
              <div className="pagination-product">
              <Pagination defaultCurrent={1} defaultPageSize={numEachPage} //default size of page
                                                      onChange={this.handleChange}
                                                                  total={productData.length} //total number of card data available
/> 
              </div>
            </div>
    </div>
  )
}
}