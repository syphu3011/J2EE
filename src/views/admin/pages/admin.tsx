import LayoutPage from "../components/layout";
import "../style/leftbar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/pagecontent/loginpage";
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

function Admin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Admin" element={<LayoutPage />}>
          <Route index element={<HomeAdmin />} />
          <Route path="Home" element={<HomeAdmin />} />
          <Route path="Customers" element={<Customer />} />
          <Route path="AccountCus" element={<AccountCus />} />
          <Route path="Products" element={<Product />} />
          <Route path="Products" element={<Product />} />
          <Route path="TypePro" element={<Typeproduct />} />
          <Route path="ProInStock" element={<Inventory />} />
          <Route path="Attribute" element={<Attribute />} />
          <Route path="Message" element={<Message />} />
          <Route path="Orders" element={<Order />} />
          <Route path="HistoryOr" element={<History />} />
          <Route path="ImportNew" element={<Import />} />
          <Route path="HistoryImp" element={<HisImp />} />
          <Route path="InforStaff" element={<Staff />} />
          <Route path="AccountStaff" element={<AccStaff />} />
          <Route path="InforPart" element={<Partner />} />
          <Route path="Provider" element={<Provider />} />
          <Route path="Number" element={<StatNumber />} />
          <Route path="Chart" element={<StatNumber />} />
          <Route path="Status" element={<StatNumber />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Admin;
