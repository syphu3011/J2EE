import React from 'react';    
import ReactDOM from 'react-dom';    
import Admin from './views/admin/pages/admin';
import Main from './views/pages/main'; 
import { CartProvider } from 'react-use-cart';

ReactDOM.render(
     <Admin />
/* <CartProvider>
     <Main />
</CartProvider> */
, document.getElementById('app'));  

import React from 'react';    
import ReactDOM from 'react-dom';    

import Main from './views/pages/main'; 
import Admin from './views/pages/'; 
const param = window.location.search
let component_render
switch (param) {
    case "?admin=true": 
        component_render = <Main/>
        break
    default: 
        component_render = </>

}
ReactDOM.render(<Main />, document.getElementById('app'));  