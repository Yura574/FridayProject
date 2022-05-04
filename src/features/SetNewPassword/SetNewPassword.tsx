import React, {useEffect, useState} from 'react';
import s from './SetNewPassword.module.css';
import SuperButton from '../../CommonComponents/c2-SuperButton/SuperButton';
import SuperInputText from '../../CommonComponents/c1-SuperInputText/SuperInputText';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setNewPassword, setErrorMessage} from '../../store/redusers/setNewPassword-reducer';
import {AppRootStateType} from '../../store/store';

export const SetNewPassword = () => {

    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const {token} = useParams();

    const isSuccess = useSelector<AppRootStateType, boolean>((state) => state.setNewPassword.isSuccess)
    const errorMessage = useSelector<AppRootStateType, string | null>((state) => state.setNewPassword.errorMessage)

    const dispatch = useDispatch<any>();

    useEffect(() => {
        if (isSuccess) {
            dispatch(setErrorMessage(null));
            navigate('/login');
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
            <div className={s.card}>
                <h2 className={s.mainTitle}>It-incubator</h2>
                <h3 className={s.secondTitle}>Create new password</h3>
                <SuperInputText type={"password"} placeholder={'Password'} value={password} onChangeText={onChangePasswordField}/>
                <div className={s.error}>{errorMessage && errorMessage}</div>
                <p className={s.text}>Create new password and we will send you further instructions to email</p>
                <SuperButton onClick={onClickCreateNewPassword} className={s.btn} disabled={!password}>Create new password</SuperButton>
            </div>
        </div>
    );
};