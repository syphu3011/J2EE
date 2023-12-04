import { List } from "antd"
import { Link } from "react-router-dom"
import { convertB64ToImage } from "../../../../utils/util"

export const SearchResult = ({results}) =>{
     return(
          <div className="content-list">
               {
                    results.map((result,id)=>{
                         const selectedMH = result.mathang[0]
                         return(
                              <div key={id}>
                                   <List>
                                        <List.Item key={result.ma} className="item-in-list">
                                             <List.Item.Meta
                                                  
                                                  avatar={<img src={convertB64ToImage(result.anhminhhoa)}style={{width:"50px"}} />}
                                                  title={<Link to={`/products/${result.ma}`}>
                                                  {result.ten}</Link>}
                                                  description={<div>
                                                        Giá: {selectedMH.giaban.toLocaleString()}
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