import React from 'react';
import HomeAdmin from '../pages/home';
import Customer from '../pages/customer';
import {Routes,Route} from 'react-router-dom';
import Leftbar from '../components/leftbar';
import Receipt from '../pages/receipt';
export default class AppRoutesAdmin extends React.Component {
    
     render(){
        const data = [ {
            id:Customer,
            element:<Customer/>,
        }]
          return(
               <Routes>
                    <Route path="/" element={<HomeAdmin/>}></Route>
                    <Route path="/Customer" element={<Customer/>}></Route>
                    <Route path="/Receipt" element={<Receipt/>}></Route>
               </Routes>
          )
     }
}
