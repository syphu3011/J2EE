
import ReactDOM from "react-dom";
import Main from "./views/pages/main";
import Admin from "./views/admin/pages/admin";
import { CartProvider } from "react-use-cart";
import Test from "./views/components/test";
import Coding_ok from "./views/coding_ok";
const param = window.location.search;
let component_render;
switch (param) {
  case "?admin=true":
    component_render = <Admin />;
    break;
  case "?test=true": 
    component_render = <Coding_ok/>;
    break
  default:
    component_render = (
      <CartProvider>
        <Main />
      </CartProvider>
    );
    break;
}
ReactDOM.render(component_render, document.getElementById("app"));
// ReactDOM.render(<Admin />, document.getElementById("app"));
