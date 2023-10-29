import React from 'react';
import "../../Styles/color.css";


const ColorGroups = () => {
  const colors = ['white', 'black', 'yellow', 'blue', 'red','Aqua','Bisque','brown','chartreuse','cornflowerBlue','gray','green','yellow','purple'];
  const handleClick = (color) => {
    // Xử lý logic khi màu được chọn
    console.log('Selected color:', color);
  };

  return (
    <div className='color-groups'>
      {colors.map((color) => (
        <div
          key={color}
          className={`color color-${color}`}
          onClick={() => handleClick(color)}
        />
      ))}
    </div>
  );
};

export default ColorGroups;