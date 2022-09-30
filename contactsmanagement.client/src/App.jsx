import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RegisterUser from './components/RegisterUser';
import EditUser from './components/EditUser';
import Users from './components/Users';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

export default class App extends Component
{
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/edit-user/:id" element={<EditUser />} />
                    <Route path="/register-user" element={<RegisterUser />} />
                </Routes>
            </Router>
        );
    }
}