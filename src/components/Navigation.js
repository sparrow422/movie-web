import React from "react";
import { Link } from "react-router-dom"

function Navigation(){
    return (<div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/detail">Detail</Link>
    </div>
    );
}

export default Navigation;