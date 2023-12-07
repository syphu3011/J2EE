import Category from "./category";
import { useEffect, useState } from "react";
import { getProductData } from "../../components/product/productData";
import LoadingPage from "../../loadingPage";
import { getAllCategories } from "../../../controllers/modules/customer/categories";
import { useLocation, useParams } from "react-router-dom";

const CategoryMediate = ({isAccess = true}) => {
    const location = useLocation();
    const { categoryId } = useParams(); 
    // const productData = location.state.productData
    const path = location.pathname
    
    const [productData,setProductData] = useState(null)
    const [filteredProductData,setFilteredProductData] = useState(null)
    const [allCategories, setAllCategories] = useState(null)
    const [productDataCate, setProductDataCate] = useState(null)

    // useEffect(() => {
    //     getProductData("data").then(rs => {

    //         setProductData(rs)
    //     }
    //     )
    // },[])
    useEffect(() => {
        const fetchData = async () => {
            const [allCate, allProdCate] = await Promise.all([getAllCategories(), getProductData('data')]);
            const productData = allCate.data.loaikhachhang.data;
            setProductData(productData);
            setAllCategories(allCate)
            setProductDataCate(allProdCate)
            const selectedProduct = productData.find((product) => product.ten == categoryId);
      
            if (selectedProduct) {
              const productList = selectedProduct.sanpham.map((product) => ({
                ma: product.ma,
                ten: product.ten,
                anhminhhoa: product.anhminhhoa,
                mota: product.mota,
                gia: product.gia,
                mau:product.mathang[0].mau.ten,
                kichco: product.mathang[0].kichco.ten,
              }));
      
              setFilteredProductData(productList);
        };
        }
        // if (isAccess) {
            fetchData()
            isAccess = false
        // }
      }, [categoryId, isAccess, location.state]);
    return filteredProductData ? <Category productData={filteredProductData} allCategories={allCategories} productDataCate={productDataCate}/> : <LoadingPage/>
}
export default CategoryMediate;