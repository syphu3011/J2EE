import React from 'react';    
import ReactDOM from 'react-dom';    

import Main from './views/pages/main'; 
import { CartProvider } from 'react-use-cart';

ReactDOM.render(
<CartProvider>
     <Main />
</CartProvider>
, document.getElementById('app'));  