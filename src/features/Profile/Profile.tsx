import {Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import s from './Profile.module.css'
import {logoutTC} from "../../store/redusers/profile-reducer";


export const Profile = () => {
    const dispatch = useDispatch<any>()
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const avatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)


    const logout =()=> {
        dispatch(logoutTC())
    }

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.profileBody}>
            <div className={s.profileWrapper}>
                <div>
                    <img src={avatar} alt={'avatar'}/>
                </div>
                <NavLink to={'/edit-profile'}>
                    <button>Edit profile</button>
                </NavLink>
            </div>
            <button onClick={logout}>logout</button>
        </div>
    )
}