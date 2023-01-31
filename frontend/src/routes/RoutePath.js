import React from "react"
import { Routes, Route } from "react-router-dom"

import About from "../components/About"
import Extra from "../components/Extra"
import Home from "../components/Home"
import Session from "../components/Session"

function RoutePath() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="extra" element={<Extra />} />
            <Route path="session" element={<Session />} />
        </Routes>
    )
}

export default RoutePath