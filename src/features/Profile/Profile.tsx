import {Navigate, NavLink} from "react-router-dom";
import { useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import s from './Profile.module.css'


export const Profile = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const avatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)

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
            {/*<button onClick={logout}>logout</button>*/}
        </div>
    )
}