import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import SuperButton from "../../CommonComponents/c2-SuperButton/SuperButton";
import {DataLoginType, loginTC} from "../../store/redusers/profile-reducer";
import s from './Login.module.css';
import SuperCheckbox from "../../CommonComponents/c3-SuperCheckbox/SuperCheckbox";
import SuperInputText from "../../CommonComponents/c1-SuperInputText/SuperInputText";
import eyeIcon from "../../img/eye.png";
import eyeHiddenIcon from "../../img/eye-hidden.png";


export const Login = () => {
    const dispatch: AppDispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const messageError = useSelector<AppRootStateType, string>(state => state.app.messageError)
    const isDisabled = useSelector<AppRootStateType, boolean>(state => state.app.isDisabled)

    const [email, setEmail] = useState<string>('')
    //const [emailError, setEmailError] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const [passwordInputType, setPasswordInputType] = useState<string>('password')

    const emailInsertOnChangeHandler = (value: string) => {
        setEmail(value)
    }

    const passwordInsertOnChangeHandler = (value: string) => {
        setPassword(value)
    }

    const submit = (dataLogin: DataLoginType) => {
        dispatch(loginTC(dataLogin))
    }

      const changePasswordDisplay = () => {
        if (passwordInputType === 'password') {setPasswordInputType('text')}
        if (passwordInputType === 'text') {setPasswordInputType('password')}
    }


    if (isAuth) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={s.main}>

            <div className={'mainCardWrapper'}>
                <div className={'mainCardHeader'}>
                    <h1>It-incubator</h1>
                    <h3>Login</h3>
                </div>
                <div className={'mainCardBody'}>
                    <div>
                        <SuperInputText
                            title={'Email'}
                            type={"email"}
                            value={email}
                            onChangeText={emailInsertOnChangeHandler}
                            //onFocus={emailInsertOnFocusHandler}
                        />
                    </div>
                    <div>
                        {/* <span className={s.error}>{passwordError}</span> */}
                        <div className={s.inputContainer}>
                            <SuperInputText
                                title={'Password'}
                                className={'mainCardInput'}
                                type={passwordInputType}
                                //type={passwordInputType}
                                value={password}
                                onChangeText={passwordInsertOnChangeHandler}
                                //onFocus={passwordInsertOnFocusHandler}
                            />
                            <img
                                src={passwordInputType === 'text' ? eyeIcon : eyeHiddenIcon}
                                className={s.eyeIcon}
                                onClick={changePasswordDisplay}
                            />
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
                <div className={'mainCardError'}>{messageError}</div>
                <div className={'mainCardFooter'}>
                    {/* <SuperButton onClick={clearFormHandler}>Cancel</SuperButton> */}
                    <SuperButton onClick={() => submit({email, password, rememberMe})}
                                 disabled={isDisabled}>
                        Submit
                    </SuperButton>


                </div>
            </div>
        </div>
    );
}