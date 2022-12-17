import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import PropertyDetail from './Pages/PropertyDetail';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/favorites/:id" element={<Home criteria="favorites" />} />
                <Route path="/reservations/:id" element={<Home criteria = "reservations" />} />
                <Route path="/" element={<Home/ >} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/login/guest" element= {<Login />} />
                <Route path="/signup/guest" element = {<SignUp /> } />
                <Route path="/host/:id" element = {<Home criteria="host" />} />
                <Route path="/host/add" element = {<Home criteria="host-add" />} />
                <Route path="/host/edit/:id" element = {<Home criteria="host-edit" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;