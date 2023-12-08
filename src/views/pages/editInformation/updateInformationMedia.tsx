import { useEffect, useState} from "react";
import { getProductData } from "../../components/product/productData";
import LoadingPage from "../../loadingPage";
import { getinformation } from "../../../controllers/modules/customer/changeinformation";
import UpdateInformation from "./updateInformation";

const UpdateInformationMedia = ({isLoggedIn=true}) => {
     const [information,setInformation] =  useState(null);
    useEffect(() => {
               if (isLoggedIn) {
                    const updateUsername = async () => {
                         // Lấy thông tin username từ loggedInUser
                         try {
                              const response = await getinformation();
                              console.log(response);
                              if (response.data.thongtinkhachhang.status === 200) {
                                  const  username= response.data.thongtinkhachhang.data
                                  setInformation(username);
                              } else {
                                console.error('Get Infomation request failed:', response.data.thongtinkhachhang.message);
                              }
                            } catch (error) {
                              console.error('Error during logout:', error);
                            }
                         // Cập nhật giá trị của biến username
                       };
                       updateUsername();
               }
             }, [isLoggedIn]);
    return information!=null ? <UpdateInformation userProfiles={information}/> : <LoadingPage/>
}
export default UpdateInformationMedia ;