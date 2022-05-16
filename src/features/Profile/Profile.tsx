import {Navigate, NavLink} from "react-router-dom";
import { useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import s from './Profile.module.css'


export const Profile = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const avatar = useSelector<AppRootStateType, string>(state => state.profile.profile.avatar)
    const name = useSelector<AppRootStateType, string>(state => state.profile.profile.name)

    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={s.profileBody}>
            <div className={s.profileWrapper}>
                <div>
                    <img src={avatar} alt={'avatar'} className={s.avatar}/>
                </div>
                <h3>{name}</h3>
                <NavLink to={'/edit-profile'}>
                    <button>Edit profile</button>
                </NavLink>
            </div>
        </div>
    )
}