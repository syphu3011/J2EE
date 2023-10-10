import { Carousel,Image } from "antd";
import React from 'react';
//const root_directory_source = '../../../../src/Image/bannerHeader';
import banner1 from '../../components/Image/bannerHeader/Banner1.png';
import banner2 from '../../components/Image/bannerHeader/Banner2.png';
import banner3 from '../../components/Image/bannerHeader/Banner3.png';
import banner4 from '../../components/Image/bannerHeader/Banner4.png';
import banner5 from '../../components/Image/bannerHeader/Banner5.png';

export default class BannerHeader extends React.Component {
  render() {
    //const imageUrls = [banner1, banner2, banner3, banner4, banner5];
    const imageUrls = [
      banner1,banner2,banner3,banner4,banner5  ];
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