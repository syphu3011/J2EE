import { useLocation } from "react-router-dom";
import Category from "./category";
import { useEffect, useState } from "react";
import { getProductData } from "../../components/product/productData";
import LoadingPage from "../../loadingPage";


const CategoryMediate = () => {
    const location = useLocation(); 
    // const productData = location.state.productData
    const path = location.pathname
    const [productData,setProductData] = useState(null)
    useEffect(() => {
        getProductData("data").then(rs => {

            setProductData(rs)
        }
        )
    },[])
    return productData ? <Category productData={productData}/> : <LoadingPage/>
}
export default CategoryMediate