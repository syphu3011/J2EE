import React from 'react';
import HomeAdmin from '../components/pagecontent/home';
import Customer from '../components/pagecontent/customer';
import {Routes,Route} from 'react-router-dom';
import Leftbar from '../components/layout';
import Receipt from '../components/pagecontent/receipt';

export default class AppRoutesAdmin extends React.Component {
    
     render(){
        const data = [ {
            id:Customer,
            element:<Customer/>,
        }]
          return(
               <Routes>
                    <Route path="/" element={<HomeAdmin/>}   ></Route>
                    <Route path="/Customers" element={<Customer/>}></Route>
                    <Route path="/Receipt" element={<Receipt/>} ></Route>
               </Routes>
          )
     }
}
