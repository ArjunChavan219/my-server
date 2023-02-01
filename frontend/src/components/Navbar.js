import React from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../provider/AuthProvider"

function Navbar() {
    const style = {
        padding: "10px"
    }
    const { user } = useAuth()
    return (
        <nav>
            <NavLink to="/" style={style}>Home</NavLink>
            <NavLink to="/about" style={style}>About</NavLink>
            {user.username && <NavLink to="/profile" style={style}>Profile</NavLink>}
            {!user.username && <NavLink to="/login" style={style}>Login</NavLink>}
            <NavLink to="/extra" style={style}>Extra</NavLink>
            <NavLink to="/session" style={style}>Session Page</NavLink>
        </nav>
    )
}

export default Navbar