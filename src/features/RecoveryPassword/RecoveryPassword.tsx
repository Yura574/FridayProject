import React, {useState} from 'react';
import s from './RecoveryPassword.module.css';
import SuperInputText from '../../CommonComponents/c1-SuperInputText/SuperInputText';
import SuperButton from '../../CommonComponents/c2-SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import emailImg from '../../img/email-picture.svg';
import {requestNewPassword, setErrorMessage, setIsSuccess} from '../../store/redusers/recoveryPassword-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../store/store';

export const RecoveryPassword = () => {

    const [email, setEmail] = useState('');

    const isSuccess = useSelector<AppRootStateType, boolean>((state) => state.recoveryPassword.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string | null>((state) => state.recoveryPassword.errorMessage)

    const dispatch = useDispatch<any>();

    const onClickSendInstructions = () => {
        dispatch(requestNewPassword(email));
    }

    const onChangeEmailField = (value: string) => {
        setEmail(value);
        dispatch(setErrorMessage(null));
    }

    const checkEmail = (
        <>
            <div className={s.emailImgWrapper}>
                <img className={s.emailImg} src={emailImg} alt={'email-picture'}/>
            </div>
            <h3 className={s.secondTitle}>Check Email</h3>
            <p className={`${s.text} ${s.emailText}`}>We’ve sent an Email with instructions to {email}</p>
            <a className={s.link} onClick={() => dispatch(setIsSuccess(false))}>Email not received? Try again</a>
        </>
    );

    const recoveryPassword = (
        <>
            <h3 className={s.secondTitle}>Forgot your password?</h3>
            <SuperInputText placeholder={'Email'} value={email} onChangeText={onChangeEmailField}/>
            <div className={s.error}>{errorMessage && errorMessage}</div>
            <p className={s.text}>Enter your email address and we will send you further instructions</p>
            <SuperButton onClick={onClickSendInstructions} className={s.btn} disabled={!email}>Send Instructions</SuperButton>
            <p className={s.text}>Did you remember your password?</p>
            <NavLink className={s.link} to={'/login'}>Try logging in</NavLink>
        </>
    )

    return (
        <div className={s.recoveryPassword}>
            <div className={s.card}>
                <h2 className={s.mainTitle}>It-incubator</h2>
                {isSuccess
                    ? checkEmail
                    : recoveryPassword}
            </div>
        </div>
    )
}