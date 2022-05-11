import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";

import SuperButton from "../../CommonComponents/c2-SuperButton/SuperButton";
import {DataLoginType, loginTC} from "../../store/redusers/profile-reducer";
import s from './Login.module.css';
import SuperCheckbox from "../../CommonComponents/c3-SuperCheckbox/SuperCheckbox";
import {Loader} from "../../CommonComponents/c4-Loader/Loader";


export const Login = () => {
    const dispatch: AppDispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.app.isLoading)
    const messageError = useSelector<AppRootStateType, string>(state => state.app.messageError)
    const isDisabled = useSelector<AppRootStateType, boolean>(state => state.app.isDisabled)

    const [email, setEmail] = useState<string>('')
    //const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const emailInsertOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const passwordInsertOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const submit = (dataLogin: DataLoginType) => {
        dispatch(loginTC(dataLogin))
    }

    //   const changePasswordDisplay = () => {
    //     if (passwordInputType === 'password') {setPasswordInputType('text')}
    //     if (passwordInputType === 'text') {setPasswordInputType('password')}
    // }


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={s.main} >
            {isLoading && <Loader/>}

            <div className={s.form}>
                <div className={s.headerBlock}>
                    <h1>It-incubator</h1>
                    <h3>Login</h3>
                </div>
                <div className={s.inputsBlock}>
                    <div>
                        <span className={s.inputDescription}>Email </span>

                        <input
                            className={s.input}
                            type={"email"}
                            value={email}
                            onChange={emailInsertOnChangeHandler}
                            //onFocus={emailInsertOnFocusHandler}
                        />
                    </div>
                    <div>
                        <span className={s.inputDescription}>Password </span>
                        {/* <span className={s.error}>{passwordError}</span> */}
                        <div className={s.inputContainer}>
                            <input
                                className={s.input}
                                //type={passwordInputType}
                                value={password}
                                onChange={passwordInsertOnChangeHandler}
                                //onFocus={passwordInsertOnFocusHandler}
                            />
                            {/* <img
                  src={eyeIcon}
                  className={s.eyeIcon}
                  onClick={changePasswordDisplay}
                /> */}
                        </div>
                    </div>
                    {/* <div>
              <span className={s.inputDescription}>Confirm password </span>
              <span className={s.error}>{confirmPasswordError}</span>
              <div className={s.inputContainer}>
                <input
                  className={s.input}
                  type={passwordInputType}
                  value={confirmPasswordInsert}
                  onChange={confirmPasswordInsertOnChangeHandler}
                  onFocus={confirmPasswordInsertOnFocusHandler}
                />
                <img
                  src={eyeIcon}
                  className={s.eyeIcon}
                  onClick={changePasswordDisplay}
                />
              </div>
            </div> */}
                    {/* <div className={s.error}>{serverError}</div> */}
                </div>
                <div style={{display: 'flex', alignItems: "center"}}>
                    <SuperCheckbox checked={rememberMe} onChangeChecked={setRememberMe}/>
                    <span>Remember me</span>
                </div>
                <div className={s.error}>{ messageError}</div>
                <div className={s.buttonBlock}>
                    {/* <SuperButton onClick={clearFormHandler}>Cancel</SuperButton> */}
                    <SuperButton className={s.blue} onClick={() => submit({email, password, rememberMe})}
                                 disabled={isDisabled}>
                        Submit
                    </SuperButton>


                </div>
            </div>
        </div>
    );
}