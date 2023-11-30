import { Card,Image, } from 'antd';
import {useEffect, useState}from 'react';
//const root_directory_source = '/src/views/components/Image/CardsMenu';
import ao from "../../components/Image/CardsMenu/Ao.png";
import quan from "../../components/Image/CardsMenu/quan.png";
import dam from "../Image/CardsMenu/dam.png";
import aokhoac from "../../components/Image/CardsMenu/aokhoac.png";
import phukien from "../../components/Image/CardsMenu/Vo.png";

/*const ao = `${root_directory_source}/Ao.png`;
const quan = `${root_directory_source}/quan.png`;
const dam = `${root_directory_source}/dam.png`;
const aokhoac = `${root_directory_source}/aokhoac.png`;
const phukien = `${root_directory_source}/Vo.png`;*/
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';
import MenuRight from '../Header/menuRight';
import MenuLeft from '../Header/menuLeft';
export default function MenuCard({cardData=[], productCategoryData=[]}){
     const [listProduct, setListProduct] = useState([])
     const [isFirst, setIsFirst] = useState(false)
     const [mainCardData, setMainCardData] = useState(cardData)
     const [mainProductCategoryData, setMainProductCategoryData] = useState(productCategoryData)
     useEffect(() => {
          setMainCardData(cardData)
          setMainProductCategoryData(productCategoryData)
          cardData.forEach(card => {
               const cate = productCategoryData.find(e => e.ten == card.name)
               if (cate) {
                    listProduct[card.name] = cate.sanpham
               }
          })
          if (isFirst) {
               setIsFirst(true)
               AOS.init();
          }
        }, [cardData, productCategoryData]);
          // const cardData1 = [
          //      {    
          //           image:ao,
          //           name:'Áo',
          //           key:'ao'
          //      },
          //      {    image:quan,
          //           name:'Quần',
          //           key:'quan',
          //      },
          //      {
          //           image:dam,
          //           name:'Đầm',
          //           key:'dam',
          //      },
          //      {
          //           image:aokhoac,
          //           name:'Áo khoác',
          //           key:'aokhoac',
          //      },{
          //           image:phukien,
          //           name:"Phụ kiện",
          //           key:'phukien',
          //      }
          // ];
          return (
               <div>
               <div className='cardMenu'> 
               {cardData.map((card,index)=>(
                    <Link to={`/${card.key}`} key={index} state={{productData: listProduct[card.name]}}>
                    <Card className="cards_Item" data-aos="fade-down">
                         <div className="ImageCard">
                              <Image className="ImageInCard"  src={card.image}/>
                         </div>
                         <div className="nameCard">
                              <h4>{card.name}</h4>
                         </div>
                    </Card>
                    </Link>
               ))}
               </div>

               </div>
          )
     }