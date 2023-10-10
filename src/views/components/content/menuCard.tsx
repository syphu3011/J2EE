import { Card,Image } from 'antd';
import React from 'react';
import ao from '../../components/Image/CardsMenu/Ao.png';
import quan from '../Image/CardsMenu/quan.png';
import dam from '../Image/CardsMenu/dam.png';
import aokhoac from '../Image/CardsMenu/aokhoac.png';
import phukien from '../Image/CardsMenu/Vo.png';
export default class MenuCard extends React.Component{
     render(){
          const cardData = [
               {    
                    image:ao,
                    name:'Áo',
               },
               {    image:quan,
                    name:'Quần'},
               {
                    image:dam,
                    name:'Đầm',
               },
               {
                    image:aokhoac,
                    name:'Áo khoác',
               },{
                    image:phukien,
                    name:"Phụ kiện",
               }
          ];
          return (
               <div className='cardMenu'> 
               {cardData.map((card,index)=>(
                    <Card className="cards_Item" key={index}>
                         <div className="ImageCard">
                              <Image src={card.image}/>
                         </div>
                         <div className="nameCard">
                              <h4>{card.name}</h4>
                         </div>
                    </Card>
               ))}
               </div>
          )
     }
}