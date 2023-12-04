import {
  Button,
  Card,
  Col,
  Row,
  Select,
  Typography,
  Image,
  Pagination,
} from "antd";
import React from "react";
import AddToCartButton from "../cart/addToCartButton";
import { Link, useLocation } from "react-router-dom";
import { getProducts } from "../../../controllers/modules/customer/products";
import { getProductData } from "./productData1";
import { convertB64ToImage } from "../../../../utils/util";
interface ProductProps {
  // category?:string;
  productData: [];
}
interface ProductState {
  minValue: number;
  maxValue: number;
  productData: [any];
}
export default class Product extends React.PureComponent<
  ProductProps,
  ProductState
> {
  // productResponse
  constructor(props) {
    super(props);
    this.state = {
      minValue: 0,
      maxValue: 8,
      productData: props.productData,
    };
    // this.productResponse = getProducts(-1, "", -1, -1)
  }

  handleChange = (value) => {
    if (value <= 1) {
      this.setState({
        minValue: 0,
        maxValue: 8,
      });
    } else {
      this.setState({
        minValue: this.state.maxValue,
        maxValue: value * 8,
      });
    }
  };
  render() {
    //const {  category } = this.props;
    const numEachPage = 8;
    /*const filteredProducts = productData.filter(
      (product) => product.category === category
    );*/
    return (
      <div className="product-container">
        <div className="title-product">
          <h2>
            {this.state.productData ? this.state.productData[0].loai.ten : ""}
          </h2>
          <div className="title-swap-product">
            <Typography.Text>Sắp xếp </Typography.Text>
            <Select
              defaultValue={"low-high"}
              options={[
                {
                  label: "Giá thấp đến cao",
                  value: "low-high",
                },
                {
                  label: "Giá cao đến thấp",
                  value: "hight-low",
                },
              ]}
            ></Select>
          </div>
        </div>
        <div className="content-product">
          <div className="product-content-container">
            {this.state.productData &&
              this.state.productData.length > 0 &&
              this.state.productData
                .slice(this.state.minValue, this.state.maxValue)
                /*filteredProducts
                                   .filter(
                                     (product) =>
                                       product.id >= this.state.minValue && product.id <= this.state.maxValue
                                   )*/ .map((product) => (
                  <div>
                    <Card key={product.ma} className="card_1">
                      <Link to={`/products/${product.ma}`}>
                        <Image
                          src={convertB64ToImage(product.anhminhhoa)}
                          className="image-card"
                        ></Image>{" "}
                        <br />
                        <h4>{product.ten}</h4>
                        <p>{product.gia.toLocaleString()} VND</p>
                      </Link>
                      <AddToCartButton
                        item={product}
                        selectedColor={product.mathang[0].mau.ten}
                        selectedSize={product.mathang[0].mau.kichco}
                        amount={1}
                      />
                    </Card>
                  </div>
                ))}
          </div>
          <div className="pagination-product">
            <Pagination
              defaultCurrent={1}
              defaultPageSize={numEachPage} //default size of page
              onChange={this.handleChange}
              total={this.state.productData.length} //total number of card data available
            />
          </div>
        </div>
      </div>
    );
  }
}
