import React from "react";
import { Link } from "react-router-dom"
import "./Navigation.css";

function Navigation(){
    return (<div className= 'nav-container'>
        <Link to="/" className='nav-item'>Home</Link>
        <Link to="/about" className='nav-item'>About</Link>
        {/* <Link to="/detail">Detail</Link> */}
    </div>
    );
}

export default Navigation;