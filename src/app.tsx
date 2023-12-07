import ReactDOM from "react-dom";
import Main from "./views/pages/main";
import Admin from "./views/admin/pages/admin";
import { CartProvider } from "react-use-cart";
import Test from "./views/components/test";
import Coding_ok from "./views/coding_ok";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Login from "./views/admin/components/loginpage/loginpage";
import HomeAdmin from "./views/admin/components/pagecontent/home";
import Customer from "./views/admin/components/pagecontent/customer/customer";
import AccountCus from "./views/admin/components/pagecontent/customer/accountCus";
import Product from "./views/admin/components/pagecontent/product/product";
import Typeproduct from "./views/admin/components/pagecontent/product/typeproduct";
import Inventory from "./views/admin/components/pagecontent/product/inventory";
import Attribute from "./views/admin/components/pagecontent/product/attribute";
import Message from "./views/admin/components/pagecontent/Message/message";
import Order from "./views/admin/components/pagecontent/Orders/order";
import History from "./views/admin/components/pagecontent/Orders/historyorder";
import Import from "./views/admin/components/pagecontent/import/importcoupon";
import HisImp from "./views/admin/components/pagecontent/import/historyImp";
import Staff from "./views/admin/components/pagecontent/staff/staffs";
import AccStaff from "./views/admin/components/pagecontent/staff/accountStaff";
import Partner from "./views/admin/components/pagecontent/partner/partnerInfo";
import Provider from "./views/admin/components/pagecontent/partner/provider";
import StatNumber from "./views/admin/components/pagecontent/Statistics/StatNumber";
import StatChart from "./views/admin/components/pagecontent/Statistics/StatChart";
import Status from "./views/admin/components/pagecontent/status/Status";
import LoginOTP from "./views/admin/components/loginpage/loginOTP";
import LayoutPage from "./views/admin/components/layout";
import { postKeyToServer } from "./controllers/modules/key";
import ProductDetail from "./views/components/product/productDetail";
import PageContent from "./views/components/content/content";
import DeliveryInform from "./views/components/cart/deliveryInform";
import CategoryMediate from "./views/pages/category/CategoryMediate";
import UpdateInformation from "./views/pages/editInformation/updateInformation";
import Home from "./views/pages/home/home";
const param = window.location.search;
let component_render;
switch (param) {
  case "?test=true":
    component_render = <Coding_ok />;
    break;
  default:
    component_render = (
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <CartProvider>
                <Main />
              </CartProvider>
            }
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/:categoryId" element={<CategoryMediate />}></Route>
            <Route
              path="/cap-nhat-thong-tin"
              element={<UpdateInformation />}
            ></Route>
            <Route path="/products/:Id" element={<ProductDetail />}></Route>
            <Route
              path="/gio-hang/xac-nhan-thong-tin-giao-hang"
              element={<DeliveryInform />}
            ></Route>
          </Route>
          <Route path="/LoginAdmin" element={<Login />}></Route>
          <Route path="/AccessOTP" element={<LoginOTP />}></Route>
          <Route path="/Admin" element={<LayoutPage />}>
            <Route index element={<HomeAdmin />} />
            <Route path="Customers" element={<Customer />} />
            <Route path="AccountCus" element={<AccountCus />} />
            <Route path="Products" element={<Product />} />
            <Route path="TypePro" element={<Typeproduct />} />
            <Route path="ProInStock" element={<Inventory />} />
            <Route path="Attribute" element={<Attribute />} />
            {/* <Route path="Message" element={<Message />} /> */}
            <Route path="Orders" element={<Order />} />
            <Route path="HistoryOr" element={<History />} />
            <Route path="ImportNew" element={<Import />} />
            <Route path="HistoryImp" element={<HisImp />} />
            <Route path="InforStaff" element={<Staff />} />
            <Route path="AccountStaff" element={<AccStaff />} />
            <Route path="InforPart" element={<Partner />} />
            <Route path="Provider" element={<Provider />} />
            <Route path="Number" element={<StatNumber />} />
            <Route path="Chart" element={<StatChart />} />
            <Route path="Status" element={<Status />} />
            <Route path="Home" element={<HomeAdmin />} />
          </Route>
        </Routes>
      </HashRouter>
    );
    break;
}
ReactDOM.render(component_render, document.getElementById("app"), () => {
  // window.onload = () => postKeyToServer()
});
// ReactDOM.render(<Admin />, document.getElementById("app"));
