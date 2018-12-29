import React, { Component } from "react";
import MenuBar from './MenuBar/MenuBar';
import './AdminProfil.css';

class AdminProfil extends Component {
    
    render() {
        return(
           <section>
               <div className="container">
                    <MenuBar />
               </div>
           </section>
        );
    }
};

export default AdminProfil;

