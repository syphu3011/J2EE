import { Card,Image, } from 'antd';
import {useEffect}from 'react';
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
export default function MenuCard(){
     useEffect(() => {
          AOS.init();
        }, []);
          const cardData = [
               {    
                    image:ao,
                    name:'Áo',
                    key:'ao'
               },
               {    image:quan,
                    name:'Quần',
                    key:'quan',
               },
               {
                    image:dam,
                    name:'Đầm',
                    key:'dam',
               },
               {
                    image:aokhoac,
                    name:'Áo khoác',
                    key:'aokhoac',
               },{
                    image:phukien,
                    name:"Phụ kiện",
                    key:'phukien',
               }
          ];
          return (
               <div>
               <div className='cardMenu'> 
               {cardData.map((card,index)=>(
                    <Link to={`/${card.key}`} key={index}>
                    <Card className="cards_Item" data-aos="fade-down">
                         <div className="ImageCard">
                              <Image src={card.image}/>
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