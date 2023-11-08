import { List } from "antd"
import { Link } from "react-router-dom"

export const SearchResult = ({results}) =>{
     return(
          <div className="content-list">
               {
                    results.map((result,id)=>{
                         return(
                              <div key={id}>
                                   <List>
                                        <List.Item key={result.id} className="item-in-list">
                                             <List.Item.Meta
                                                  
                                                  avatar={<img src={result.image} style={{width:"50px"}} />}
                                                  title={<Link to={`/products/${result.id}/${result.name}`}>
                                                  {result.name}</Link>}
                                                  description={<div>
                                                       Giá: {result.price.toLocaleString()}
                                                       </div>}
                                             />
                                        
                                        </List.Item>
                                   </List>
                              </div>
                         )
                    })
               }
          </div>
     )
}