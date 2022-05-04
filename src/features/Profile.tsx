import {EditProfilePage} from "./EditProfilePage/EditProfilePage";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";


export const Profile = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return (
        <h1>
            <EditProfilePage/>
        </h1>
    )
}