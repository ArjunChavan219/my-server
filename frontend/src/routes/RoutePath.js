import React from "react"
import { Routes, Route } from "react-router-dom"

import About from "../components/About"
import Extra from "../components/Extra"
import Home from "../components/Home"
import Login from "../components/Login"
import Profile from "../components/Profile"
import Session from "../components/Session"

import Authentication from "./Authentication"
import Authorization from "./Authorization"

import PERMISSIONS from "../permissions/Permissions"

function RoutePath() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_ABOUT]} />}>
                <Route path="about" element={<About />} />
            </Route>
            <Route path="profile" element={
                <Authentication>
                    <Profile />
                </Authentication>
            } />
            <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_EXTRA]} />}>
                <Route path="extra" element={<Extra />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="session" element={<Session />} />
        </Routes>
    )
}

export default RoutePath