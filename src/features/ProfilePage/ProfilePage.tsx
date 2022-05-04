import s from './ProfilePage.module.css'
import SuperButton from "../../CommonComponents/c2-SuperButton/SuperButton";


export const ProfilePage = () => {


    return (
        <div className={s.main}>
            <div className={s.form}>
                <div className={s.headerBlock}>
                    <div className={s.header}>Personal information</div>
                    <div className={s.profile_img_wrapper}><img
                        className={s.profileImg}
                        src={'http://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'}/>
                        <button> + </button>
                    </div>
                </div>
                <div className={s.inputsBlock}>
                    <div>
                        <span className={s.inputDescription}>Nickname   </span>
                        <span className={s.error}>mailError</span>
                        <input
                            className={s.input}
                            type={"email"}

                        />
                    </div>
                    <div>
                        <span className={s.inputDescription}>email   </span>
                        <span className={s.error}>passwordError</span>
                        <input
                            className={s.input}
                            type={"password"}

                        />
                    </div>

                </div>
                <div className={s.buttonBlock}>
                    <SuperButton >Cancel</SuperButton>
                    <SuperButton className={s.blue}>Register</SuperButton>
                </div>
            </div>
        </div>
    )
}