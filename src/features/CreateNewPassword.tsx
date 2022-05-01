import s from './CreateNewPassword.module.css';
import SuperButton from "../CommonComponents/c2-SuperButton/SuperButton";


export const CreateNewPassword = () => {
    return (
        <div className={s.main}>
            <div className={s.form}>
                <div className={s.headerBlock}>
                    <h1>It-incubator</h1>
                    <h3>Sign Up</h3>
                </div>
                <div className={s.inputsBlock}>
                    <div>
                        <div className={s.inputDescription}>Email</div>
                        <input
                            className={s.input}
                            type={"email"}
                        />
                    </div>
                    <div>
                        <div className={s.inputDescription}>Password</div>
                        <input
                            className={s.input}
                            type={"password"}
                        />
                    </div>
                    <div>
                        <div className={s.inputDescription}>Confirm password</div>
                        <input
                            className={s.input}
                            type={"password"}
                        />
                    </div>
                </div>
                <div className={s.buttonBlock}>
                    <SuperButton>Cancel</SuperButton>
                    <SuperButton className={s.blue}>Register</SuperButton>
                </div>
            </div>
        </div>
    )
}