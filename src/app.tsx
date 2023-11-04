import React from 'react';    
import ReactDOM from 'react-dom';    

import Main from './views/pages/main'; 
import Admin from './views/admin/pages/admin'; 
const param = window.location.search
let component_render
switch (param) {
    case "?admin=true": 
        component_render = <Main/>
        break
    default: 
        component_render = <Admin/>

}
ReactDOM.render(<Main />, document.getElementById('app'));  