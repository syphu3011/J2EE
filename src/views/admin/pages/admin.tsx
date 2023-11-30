import LayoutPage from "../components/layout";
import LayoutPage2 from "../components/layout2";
import "../style/leftbar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../components/loginpage/loginpage";
import HomeAdmin from "../components/pagecontent/home";
import Customer from "../components/pagecontent/customer/customer";
import AccountCus from "../components/pagecontent/customer/accountCus";
import Product from "../components/pagecontent/product/product";
import Typeproduct from "../components/pagecontent/product/typeproduct";
import Inventory from "../components/pagecontent/product/inventory";
import Attribute from "../components/pagecontent/product/attribute";
import Message from "../components/pagecontent/Message/message";
import Order from "../components/pagecontent/Orders/order";
import History from "../components/pagecontent/Orders/historyorder";
import Import from "../components/pagecontent/import/importcoupon";
import HisImp from "../components/pagecontent/import/historyImp";
import Staff from "../components/pagecontent/staff/staffs";
import AccStaff from "../components/pagecontent/staff/accountStaff";
import Partner from "../components/pagecontent/partner/partnerInfo";
import Provider from "../components/pagecontent/partner/provider";
import StatNumber from "../components/pagecontent/Statistics/StatNumber";
import Status from "../components/pagecontent/status/Status";
import LoginOTP from "../components/loginpage/loginOTP";
import {useParams} from "react-router-dom";
function Admin() {
  const {id} = useParams();
  return (
    <div>
      vãi thiệt
      {id}
    </div>
  );
}
export default Admin;
