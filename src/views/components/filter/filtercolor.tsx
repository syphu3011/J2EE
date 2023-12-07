import React, { useEffect, useState } from 'react';
import "../../Styles/color.css";
import { getProductData } from '../product/productData';


const ColorGroups = ({ onColorSelect, productDataProp }) => {
  // const colors = ['white', 'black', 'yellow', 'blue', 'red','Aqua','Bisque','brown','chartreuse','cornflowerBlue','gray','green','yellow','purple','pink'];
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Call the asynchronous function getProductData to fetch product data from "data"
      setProductData(productDataProp);
    };

    fetchData(); // Call the async function
  }, []); // Run only once when the component is rendered

  const color_array = productData.map((product) => {
    return product.mathang.map(mh => mh.mau.ten)
  });
  const colors = []
  for (const color of color_array) {
    colors.push(...color)
  }
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