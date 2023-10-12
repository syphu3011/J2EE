import React from'react';
import AppRoutesAdmin from '../router/router';
export default class ContentAdmin extends React.Component{
    render(){
        return(
            <div className="content">
                <AppRoutesAdmin/>
            </div>
        )
    }
}