import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'

function Allroutes() {

    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Login />} />
        </Routes>
    )
}

export default Allroutes
