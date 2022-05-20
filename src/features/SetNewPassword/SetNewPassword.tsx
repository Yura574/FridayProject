import React, {memo, useEffect, useState} from 'react';
import s from './SetNewPassword.module.css';
import SuperButton from '../../CommonComponents/c2-SuperButton/SuperButton';
import SuperInputText from '../../CommonComponents/c1-SuperInputText/SuperInputText';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setNewPassword, setErrorMessage, setIsSuccess} from '../../store/redusers/setNewPassword-reducer';
import {AppDispatch, AppRootStateType} from '../../store/store';

export const SetNewPassword = memo(() => {

    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {token} = useParams();

    const isSuccess = useSelector<AppRootStateType, boolean>((state) => state.setNewPassword.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string | null>((state) => state.setNewPassword.errorMessage)

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setErrorMessage(null));
            navigate('/login');
        }
        return () => {
            dispatch(setIsSuccess(false));
        }
    }, [isSuccess])

    const onClickCreateNewPassword = () => {
        if (token) {
            dispatch(setNewPassword(password, token));
        }
    }

    const onChangePasswordField = (value: string) => {
        setPassword(value);
        dispatch(setErrorMessage(null));
    }

    return (
        <div className={s.setNewPassword}>
            <div className={'mainCardWrapper'}>
                <div className={'mainCardHeader'}>
                    <h1>It-incubator</h1>
                    <h3>Create new password</h3>
                </div>
                <div className={'mainCardBody'}>
                    <SuperInputText type={"password"} title={'Password'} value={password} onChangeText={onChangePasswordField}/>
                    <div className={s.error}>{errorMessage && errorMessage}</div>
                    <p className={s.text}>Create new password and we will send you further instructions to email</p>
                </div>
                <div className={'mainCardFooter'}>
                    <SuperButton onClick={onClickCreateNewPassword} className={s.btn} disabled={!password}>Create new password</SuperButton>
                </div>
            </div>
        </div>
    );
});