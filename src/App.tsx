import React from 'react';
import './App.css';
import {Navigate, NavLink, Route, Routes} from 'react-router-dom';
import {CreateNewPassword} from "./features/CreateNewPassword";
import {EnterNewPassword} from "./features/EnterNewPassword";
import {Error404} from "./features/Error404";
import {Login} from "./features/Login";
import {Profile} from "./features/Profile";
import {TestPage} from "./features/Test";

function App() {

    return (
        <div>
            <Routes>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/'} element={<Navigate to={'profile'}/>}/>
                <Route path={'/create-password'} element={<CreateNewPassword/>}/>
                <Route path={'/enter-password'} element={<EnterNewPassword/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/test'} element={<TestPage/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
            <div><NavLink to={'/profile'}>Profile</NavLink></div>
            <div><NavLink to={'/create-password'}>Create password</NavLink></div>
            <div><NavLink to={'/create-password'}>Create password</NavLink></div>
            <div><NavLink to={'/enter-password'}>Enter password</NavLink></div>
            <div><NavLink to={'/404'}>404</NavLink></div>
            <div><NavLink to={'/login'}>Login</NavLink></div>
            <div><NavLink to={'/test'}>Test</NavLink></div>
        </div>

    );
}

export default App;
