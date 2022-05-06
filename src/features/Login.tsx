import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {Navigate} from "react-router-dom";
import { useState} from "react";
import SuperInputText from "../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperCheckbox from "../CommonComponents/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../CommonComponents/c2-SuperButton/SuperButton";
import {DataLoginType, loginTC} from "../store/redusers/profile-reducer";


export const Login = () => {
    const dispatch = useDispatch<any>()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)

    const[email, setEmail] = useState<string>('')
    const[password, setPassword] = useState<string>('')
    const[rememberMe, setRememberMe] = useState<boolean>(false)

    const submit = (dataLogin: DataLoginType) => {
        dispatch(loginTC(dataLogin))
    }


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <h1>
                Login
            </h1>
            <SuperInputText
                type="email"
                onChangeText={setEmail}
                value={email}
                placeholder={'login'}
            />
            <SuperInputText
                type="password"
                onChangeText={setPassword}
                value={password}
                placeholder={'password'}
            />
            <SuperCheckbox
                type="checkbox"
                onChangeChecked={setRememberMe}
                checked={rememberMe}
            />
            <SuperButton onClick={() =>submit({email, password, rememberMe})}> submit</SuperButton>

        </div>
    )
}
// https://neko-back.herokuapp.com/2.0/auth/login
// https://neko-back.herokuapp.com/2.0/auth/login