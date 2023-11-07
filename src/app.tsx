import React from "react";
import ReactDOM from "react-dom";
import Main from "./views/pages/main";
import Admin from "./views/admin/pages/admin";
import { CartProvider } from "react-use-cart";
const param = window.location.search;
let component_render;
// switch (param) {
//   case "?admin=true":
//     component_render = <Admin />;
//     break;
//   default:
//     component_render = (
//       <CartProvider>
//         <Main />
//       </CartProvider>
//     );
//     break;
// }
// ReactDOM.render(component_render, document.getElementById("app"));
ReactDOM.render(<Admin />, document.getElementById("app"));
