import s from './EditProfilePage.module.css'
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../store/store";
import {DataType, editProfileTC} from "../../../store/redusers/profile-reducer";
import {NavLink} from "react-router-dom";
import SuperInput from "../../../CommonComponents/c1-SuperInput/SuperInput";



export const EditProfilePage = () => {
    const dispatch = useDispatch<AppDispatch>()

    const nameDefault = useSelector<AppRootStateType, string>(state => state.profile.profile.name)
    const ava = useSelector<AppRootStateType, string>(state => state.profile.profile.avatar)
    const [name, setName] = useState<string>(nameDefault)
    const [avatar, setAvatar] = useState<string>(ava)


    useEffect( () => {
        setName(nameDefault)
        setAvatar(ava)

    }, [nameDefault, ava])

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
  const changeMail = (e: ChangeEvent<HTMLInputElement>) => {
        setAvatar(e.currentTarget.value)
    }


    const editProfile = (data: DataType) => {
        debugger
       dispatch(editProfileTC(data))
    }

    const emailInputRef = useRef<any>(null);

    React.useEffect(()=>{
        emailInputRef.current?.focus();
    }, []);
    return (
        <div className={s.main}>
            <div className={s.form}>
                <div className={s.headerBlock}>
                    <div className={s.header}>Personal information</div>
                    <div className={s.profile_img_wrapper}>
                        <img
                            className={s.profileImg}
                            src={avatar} alt={'photo'}/>
                        <div className={s.test}> </div>
                    </div>
                </div>
                <div className={s.inputsBlock}>
                    <div>
                        <span className={s.inputDescription}>Nickname   </span>
                        <SuperInput ref={emailInputRef.current?.focus()} onChangeText={setName} label={'name'} value={name}/>
                        {/*<input*/}
                        {/*    ref={emailInputRef}*/}
                        {/*    className={s.input}*/}
                        {/*    type={"text"}*/}
                        {/*    value={name}*/}
                        {/*    onChange={changeName}*/}
                        {/*/>*/}
                    </div>
                    <div>
                        <span className={s.inputDescription}>Url avatar   </span>

                        <input
                            className={s.input}
                            value={avatar}
                            onChange={changeMail}
                        />
                    </div>

                </div>
                <div className={s.buttonBlock}>
                    <NavLink to={'/profile'}><SuperButton>Cancel</SuperButton></NavLink>
                    <SuperButton className={s.blue}
                     onClick={()=> editProfile({name, avatar})}>Save</SuperButton>
                </div>
            </div>
        </div>
    )
}