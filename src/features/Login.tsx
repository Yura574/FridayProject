import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {Navigate} from "react-router-dom";


export const Login = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div>
            <h1>
                Login
            </h1>

        </div>
    )
}