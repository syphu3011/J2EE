import { useLocation } from "react-router-dom";
import Category from "./category";


const CategoryMediate = () => {
    const location = useLocation(); 
    const productData = location.state.productData
    return <Category productData={productData}/>
}
export default CategoryMediate