import { Carousel,Image } from "antd";
import React from 'react';
const root_directory_source = '/src/views/components/Image/bannerHeader';
const banner1 = `${root_directory_source}/Banner1.png`;
const banner2 = `${root_directory_source}/Banner2.png`;
const banner3 = `${root_directory_source}/Banner3.png`;
const banner4 =`${root_directory_source}/Banner4.png`;
const banner5 = `${root_directory_source}/Banner5.png`;
export default class BannerHeader extends React.Component {
  render() {
    //const imageUrls = [banner1, banner2, banner3, banner4, banner5];
    const imageUrls = [
      banner1 ,banner2,banner3,banner4,banner5 ];
    return (
      <Carousel autoplay>
        {imageUrls.map((imageUrl, index) => (
        <div key={index}>
          <Image src={imageUrl} alt={`Image ${index + 1}`} className="Headerbanner" />
        </div>
        ))}
      </Carousel>
    );
  }
}