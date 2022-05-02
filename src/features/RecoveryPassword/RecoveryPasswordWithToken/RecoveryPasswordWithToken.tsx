import React, {useState} from 'react';
import s from '../RecoveryPassword.module.css';
import SuperButton from '../../../CommonComponents/c2-SuperButton/SuperButton';
import SuperInputText from '../../../CommonComponents/c1-SuperInputText/SuperInputText';
import {useNavigate} from 'react-router-dom';

export const RecoveryPasswordWithToken = () => {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');

    const onClickCreateNewPassword = () => {
        navigate('/login');
    }

    return (
        <div className={s.recoveryPassword}>
            <div className={s.card}>
                <h2 className={s.mainTitle}>It-incubator</h2>
                <SuperInputText type={"password"} placeholder={'Password'} value={newPassword} onChangeText={setNewPassword}/>
                <p className={s.text}>Create new password and we will send you further instructions to email</p>
                <SuperButton onClick={onClickCreateNewPassword} className={s.btn} disabled={!newPassword}>Create new password</SuperButton>
            </div>
        </div>
    );
};