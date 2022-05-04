import React, {useEffect} from 'react';
import './App.css';
import { NavLink, Route, Routes} from 'react-router-dom';
import {Registration} from "./features/Registration";
import {EnterNewPassword} from "./features/EnterNewPassword";
import {Error404} from "./features/Error404";
import {Login} from "./features/Login";
import {Profile} from "./features/Profile";
import {TestPage} from "./features/Test";
import {RecoveryPassword} from "./features/RecoveryPassword/RecoveryPassword";
import {
    SetNewPassword
} from "./features/SetNewPassword/SetNewPassword";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store/store";
import s from './App.module.css'

import {isAuthTC} from "./store/redusers/login-reducer";

function App() {
    const dispatch = useDispatch<AppDispatch>()

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.login.initialized)

    useEffect( () => {
        dispatch(isAuthTC())

    }, [])

    if (!isInitialized) {
        return <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            загрузка...</div>
    }


    return (
        <div className={'App'}>
            <div className={s.headerWrapper}>
                <h1>Card training</h1>
                <div className={s.nav}>
                    <div><NavLink to={'/profile'} className={({ isActive }) => isActive ? s.active : s.link}>Profile</NavLink></div>
                    <div><NavLink to={'/create-password'} className={({ isActive }) => isActive ? s.active : s.link}>Registration</NavLink></div>
                    <div><NavLink to={'/enter-password'} className={({ isActive }) => isActive ? s.active : s.link}>Enter password</NavLink></div>
                    <div><NavLink to={'/recovery-password'} className={({ isActive }) => isActive ? s.active : s.link}>Recovery Password</NavLink></div>
                    {/*<div><NavLink to={'/404'}>404</NavLink></div>*/}
                    <div><NavLink to={'/login'} className={({ isActive }) => isActive ? s.active : s.link}>Login</NavLink></div>
                    <div><NavLink to={'/test'} className={({ isActive }) => isActive ? s.active : s.link}>Test</NavLink></div>
                </div>
            </div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                 <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/create-password'} element={<Registration/>}/>
                <Route path={'/enter-password'} element={<EnterNewPassword/>}/>
                {/*<Route path={'/404'} element={<Error404/>}/>*/}
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/test'} element={<TestPage/>}/>
                <Route path={'/recovery-password'} element={<RecoveryPassword/>}/>
                <Route path={'/set-new-password/:token'} element={<SetNewPassword/>}/>
                <Route path={'*'} element={<Error404 />}/>
            </Routes>





        </div>


    );
}

export default App;
