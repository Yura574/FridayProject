import React, {useEffect} from 'react';
import './App.css';
import {NavLink, Route, Routes} from 'react-router-dom';
import {Registration} from "./features/Registration/Registration";
import {Error404} from "./features/Error404";
import {Login} from "./features/Login/Login";
import {Profile} from "./features/Profile/Profile";
import {TestPage} from "./features/Test";
import {RecoveryPassword} from "./features/RecoveryPassword/RecoveryPassword";
import {
    SetNewPassword
} from "./features/SetNewPassword/SetNewPassword";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store/store";
import s from './App.module.css'

import {isAuthTC} from "./store/redusers/login-reducer";
import {Loader} from "./CommonComponents/c4-Loader/Loader";
import {EditProfilePage} from "./features/Profile/EditProfilePage/EditProfilePage";
import {PacksListPage} from "./features/PackList/PacksListPage";
import {logoutTC} from "./store/redusers/profile-reducer";
import {Cards} from "./features/Cards/Cards";
import {LearnPage} from "./features/Learn/LearnPage";

function App() {
    const dispatch = useDispatch<AppDispatch>()

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.login.initialized)
    const isLoader = useSelector<AppRootStateType, boolean>(state => state.app.isLoading);

    useEffect(() => {
        dispatch(isAuthTC())

    }, [])
    const logout =()=> {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div style={{display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center'}}>
            загрузка...</div>
    }


    return (
        <div className={'App'}>
            {isLoader && <Loader/>}
            <div className={s.headerWrapper}>
                <h1>Card training</h1>
                <div className={s.nav}>
                    <div><NavLink to={'/packslist'}
                                  className={({isActive}) => isActive ? s.active : s.link}>Packs List</NavLink></div>
                    <div><NavLink to={'/profile'}
                                  className={({isActive}) => isActive ? s.active : s.link}>Profile</NavLink></div>
                    <div><NavLink to={'/create-password'}
                                  className={({isActive}) => isActive ? s.active : s.link}>Registration</NavLink></div>
                    <div><NavLink to={'/recovery-password'} className={({isActive}) => isActive ? s.active : s.link}>Recovery
                        Password</NavLink></div>
                    {/*<div><NavLink to={'/404'}>404</NavLink></div>*/}
                    <div><NavLink to={'/login'} className={({isActive}) => isActive ? s.active : s.link}>Login</NavLink>
                    </div>
                    <div><NavLink to={'/test'} className={({isActive}) => isActive ? s.active : s.link}>Test</NavLink>
                    </div>
                    <button onClick={logout} className={s.logout}>logout</button>
                </div>
            </div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/packslist'} element={<PacksListPage/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/edit-profile'} element={<EditProfilePage/>}/>
                <Route path={'/create-password'} element={<Registration/>}/>
                {/*<Route path={'/404'} element={<Error404/>}/>*/}
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/test'} element={<TestPage/>}/>
                <Route path={'/recovery-password'} element={<RecoveryPassword/>}/>
                <Route path={'/set-new-password/:token'} element={<SetNewPassword/>}/>
                <Route path={'/cards/:cardsPack_id'} element={<Cards/>}/>
                <Route path={'/learn/:cardsPack_id'} element={<LearnPage/>}/>
                <Route path={'*'} element={<Error404/>}/>
            </Routes>


        </div>


    );
}

export default App;
