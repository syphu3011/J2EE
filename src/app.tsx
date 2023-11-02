import React from 'react';    
import ReactDOM from 'react-dom';    
import Admin from './views/admin/pages/admin';
import Main from './views/pages/main'; 
import { CartProvider } from 'react-use-cart';

ReactDOM.render(
<CartProvider>
     <Main />
</CartProvider>
, document.getElementById('app'));  