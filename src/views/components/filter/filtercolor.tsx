import React, { useEffect, useState } from 'react';
import "../../Styles/color.css";
import { getProductData } from '../product/productData';


const ColorGroups = ({ onColorSelect }) => {
  // const colors = ['white', 'black', 'yellow', 'blue', 'red','Aqua','Bisque','brown','chartreuse','cornflowerBlue','gray','green','yellow','purple','pink'];
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Call the asynchronous function getProductData to fetch product data from "data"
      const productData = await getProductData("data");
      setProductData(productData);
    };

    fetchData(); // Call the async function
  }, []); // Run only once when the component is rendered

  const colors = productData.map((product) => product.mathang[0].mau.ten);
  // Loại bỏ các màu trùng lặp
  const uniqueColors = colors.filter((color, index) => {
  // Trả về true nếu index đầu tiên của màu này trong mảng
  return colors.indexOf(color) === index;
  });

  const handleClick = (color) => {
    // Xử lý logic khi màu được chọn
    console.log('Selected color:', color);
    onColorSelect(color);
  };

  return (
    <div className='color-groups'>
      {uniqueColors.map((mau, index) => (
        <div
          key={index}
          className="color" style={{ backgroundColor: "#"+ mau}}
          onClick={() => handleClick(mau)}
        />
      ))}
    </div>
  );
};

export default ColorGroups;