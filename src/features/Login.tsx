import {useState} from "react";
import {useDispatch} from "react-redux";
import {DataLoginType, loginTC, setProfileTC} from "../store/redusers/profile-reducer";

export const Login = () => {
    const dispatch = useDispatch<any>()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const submit = (data: DataLoginType) => {
        debugger
        dispatch(loginTC(data))
    }

    return (
        <div>
            <h1>
                Login
            </h1>
            <input
                type={'email'}
                value={email}
                placeholder={'email'}
                onChange={(e) => setEmail(e.currentTarget.value)}/>
            <input
                type={'password'}
                value={password}
                placeholder={'password'}
                onChange={(e) => setPassword(e.currentTarget.value)}/>
            <input
                type={'checkbox'}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.currentTarget.checked)}/>
            <button onClick={() => submit({email, password, rememberMe})}>submit</button>
        </div>
    )
}