import s from './Registration.module.css';
import SuperButton from "../../CommonComponents/c2-SuperButton/SuperButton";
import {ChangeEvent, useState} from "react";
import {RegistrationTC, SetServerErrorAC} from "../../store/redusers/registration-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import eyeIcon from "../../img/eye.png"
import eyeHiddenIcon from "../../img/eye-hidden.png"

export const Registration = () => {
    const serverError = useSelector<AppRootStateType, string>(state => state.registration.serverError)
    const email = useSelector<AppRootStateType, string>(state => state.registration.email)
    const dispatch: AppDispatch = useDispatch();

    const [emailInsert, setEmailInsert] = useState<string>('')
    const [passwordInsert, setPasswordInsertInsert] = useState<string>('')
    const [confirmPasswordInsert, setConfirmPasswordInsertInsert] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')
    const [passwordError, setPasswordInsertError] = useState<string>('')
    const [confirmPasswordError, setConfirmPasswordInsertError] = useState<string>('')
    const [passwordInputType, setPasswordInputType] = useState<string>('password')

    const emailInsertOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailInsert(e.currentTarget.value)
    }
    const passwordInsertOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordInsertInsert(e.currentTarget.value)
    }
    const confirmPasswordInsertOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordInsertInsert(e.currentTarget.value)
    }

    const emailInsertOnFocusHandler = () => {
        setEmailError('')
        dispatch(SetServerErrorAC(''))
    }
    const passwordInsertOnFocusHandler = () => {
        setPasswordInsertError('')
        dispatch(SetServerErrorAC(''))
    }
    const confirmPasswordInsertOnFocusHandler = () => {
        setConfirmPasswordInsertError('')
        dispatch(SetServerErrorAC(''))
    }

    const changePasswordDisplay = () => {
        if (passwordInputType === 'password') {setPasswordInputType('text')}
        if (passwordInputType === 'text') {setPasswordInputType('password')}
    }

    const clearFormHandler = () => {
        setEmailInsert('')
        setPasswordInsertInsert('')
        setConfirmPasswordInsertInsert('')
        dispatch(SetServerErrorAC(''))
    }

    const registrationHandler = () => {
        let error = false;
        if (emailInsert) {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailInsert)) {
                setEmailError('Invalid email address')
                error = true
            }
        } else {
            setEmailError(' required')
            error = true
        }
        if (passwordInsert !== confirmPasswordInsert) {
            setConfirmPasswordInsertError('Check password')
            error = true
        }
        if (passwordInsert) {
            if (passwordInsert.length < 8) {
                setPasswordInsertError(' must be more than 7 characters')
                error = true
            }
        } else {
            setPasswordInsertError(' required')
            error = true
        }
        if (confirmPasswordInsert) {
            if (confirmPasswordInsert.length < 8) {
                setConfirmPasswordInsertError(' must be more than 7 characters')
                error = true
            }
        } else {
            setConfirmPasswordInsertError(' required')
            error = true
        }
        if (!error) {
            dispatch(RegistrationTC(emailInsert, passwordInsert))
        }
    }

    if (email) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.main}>
            <div className={s.form}>
                <div className={s.headerBlock}>
                    <h1>It-incubator</h1>
                    <h3>Sign Up</h3>
                </div>
                <div className={s.inputsBlock}>
                    <div>
                        <span className={s.inputDescription}>Email   </span>
                        <span className={s.error}>{emailError}</span>
                        <input
                            className={s.input}
                            type={"email"}
                            value={emailInsert}
                            onChange={emailInsertOnChangeHandler}
                            onFocus={emailInsertOnFocusHandler}
                        />
                    </div>
                    <div>
                        <span className={s.inputDescription}>Password   </span>
                        <span className={s.error}>{passwordError}</span>
                        <div className={s.inputContainer}>
                            <input
                                className={s.input}
                                type={passwordInputType}
                                value={passwordInsert}
                                onChange={passwordInsertOnChangeHandler}
                                onFocus={passwordInsertOnFocusHandler}
                            />
                            {passwordInputType === 'text'
                                ? <img
                                    src={eyeHiddenIcon}
                                    className={s.eyeIcon}
                                    onClick={changePasswordDisplay}
                                />
                                : <img
                                    src={eyeIcon}
                                    className={s.eyeIcon}
                                    onClick={changePasswordDisplay}
                                />
                            }
                        </div>
                    </div>
                    <div>
                        <span className={s.inputDescription}>Confirm password   </span>
                        <span className={s.error}>{confirmPasswordError}</span>
                        <div className={s.inputContainer}>
                            <input
                                className={s.input}
                                type={passwordInputType}
                                value={confirmPasswordInsert}
                                onChange={confirmPasswordInsertOnChangeHandler}
                                onFocus={confirmPasswordInsertOnFocusHandler}
                            />
                            {passwordInputType === 'text'
                                ? <img
                                    src={eyeHiddenIcon}
                                    className={s.eyeIcon}
                                    onClick={changePasswordDisplay}
                                />
                                : <img
                                    src={eyeIcon}
                                    className={s.eyeIcon}
                                    onClick={changePasswordDisplay}
                                />
                            }
                        </div>
                    </div>
                    <div className={s.error}>{serverError}</div>
                </div>
                <div className={s.buttonBlock}>
                    <SuperButton
                        onClick={clearFormHandler}
                    >Cancel</SuperButton>
                    <SuperButton
                        className={s.blue}
                        onClick={registrationHandler}
                    >Register</SuperButton>
                </div>
            </div>
        </div>
    )
}