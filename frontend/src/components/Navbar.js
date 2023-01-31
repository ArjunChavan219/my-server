import React from "react"
import { NavLink } from "react-router-dom"

function Navbar() {
    const style = {
        padding: "10px"
    }
    return (
        <nav>
            <NavLink to="/" style={style}>Home</NavLink>
            <NavLink to="/about" style={style}>About</NavLink>
            <NavLink to="/extra" style={style}>Extra</NavLink>
            <NavLink to="/session" style={style}>Session Page</NavLink>
        </nav>
    )
}

export default Navbar