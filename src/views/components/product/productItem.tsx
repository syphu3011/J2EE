import React, { useState, useEffect } from "react";
import { Card, Image, Pagination } from "antd";
import { Link } from "react-router-dom";
import { convertB64ToImage } from "../../../../utils/util";
import { getProductData } from "./productData";
import AddToCartButton from "../cart/addToCartButton";

interface ProductItemProps {
  productData: any[];
  selectedColor: any[];
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const [filteredProductData, setFilteredProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Số lượng sản phẩm hiển thị trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      // Gọi hàm bất đồng bộ getProductData để lấy dữ liệu sản phẩm từ "data"
      const allProductData = await getProductData("data");
      const filteredProductData = allProductData.filter(
        (product) => product.mathang[0].mau.ten === props.selectedColor
      );
      setFilteredProductData(filteredProductData);
    };

    fetchData();
  }, [props.selectedColor]);

  // Xử lý sự kiện khi người dùng chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính toán chỉ mục của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Lấy danh sách sản phẩm trên trang hiện tại
  const currentProducts = filteredProductData.slice(startIndex, endIndex);

  return (
    <div className="product-container">
      <div className="content-product">
        <div className="product-content-container">
          {currentProducts.map((product) => (
            <Card key={product.ma} className="card_1">
              <Link to={`/products/${product.ma}`}>
                <Image
                  src={convertB64ToImage(product.anhminhhoa)}
                  className="image-card"
                />
                <br />
                <h4>{product.ten}</h4>
                <p>{product.gia.toLocaleString()} VND</p>
              </Link>
              <AddToCartButton item={product} selectedColor={product.mathang[0].mau.ten} selectedSize={product.mathang[0].mau.kichco} amount={1} />
            </Card>
          ))}
        </div>
      </div>
      <div className="pagination-product">
          <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredProductData.length}
        onChange={handlePageChange}
      />
      </div>
    </div>
  );
};

export default ProductItem;