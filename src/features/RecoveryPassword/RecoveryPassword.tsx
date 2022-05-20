import React, {memo, useEffect, useState} from 'react';
import s from './RecoveryPassword.module.css';
import SuperInputText from '../../CommonComponents/c1-SuperInputText/SuperInputText';
import SuperButton from '../../CommonComponents/c2-SuperButton/SuperButton';
import {NavLink} from 'react-router-dom';
import emailImg from '../../img/email-picture.svg';
import {requestNewPassword, setErrorMessage, setIsSuccess} from '../../store/redusers/recoveryPassword-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../../store/store';

export const RecoveryPassword = memo(() => {

    const [email, setEmail] = useState('');

    const isSuccess = useSelector<AppRootStateType, boolean>((state) => state.recoveryPassword.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string | null>((state) => state.recoveryPassword.errorMessage)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        return () => {
            dispatch(setIsSuccess(false));
        }
    }, [])

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
            <div className={'mainCardHeader'}>
                <h3>Check Email</h3>
            </div>
            <div className={'mainCardBody'}>
                <p className={`${s.text} ${s.emailText}`}>We’ve sent an Email with instructions to {email}</p>
                <a className={s.link} onClick={() => dispatch(setIsSuccess(false))}>Email not received? Try again</a>
            </div>
        </>
    );

    const recoveryPassword = (
        <>
            <div className={'mainCardHeader'}>
                <h3 className={s.secondTitle}>Forgot your password?</h3>
            </div>
            <div className={'mainCardBody'}>
                <SuperInputText
                       title={'Email'}
                       value={email}
                       onChangeText={onChangeEmailField}
                />
                <div className={'mainCardError'}>{errorMessage && errorMessage}</div>
                <p className={s.text}>Enter your email address and we will send you further instructions</p>

            </div>
            <SuperButton onClick={onClickSendInstructions} className={s.btn} disabled={!email}>Send Instructions</SuperButton>
            <p className={s.text}>Did you remember your password?</p>
            <div className={'mainCardFooter'}>
                <NavLink className={s.link} to={'/login'}>Try logging in</NavLink>
            </div>
        </>
    )

    return (
        <div className={s.recoveryPassword}>
            <div className={'mainCardWrapper'}>
                <div className={'mainCardHeader'}>
                    <h1>It-incubator</h1>
                </div>
                {isSuccess
                    ? checkEmail
                    : recoveryPassword}
            </div>
        </div>
    )
});