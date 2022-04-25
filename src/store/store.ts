import {combineReducers, createStore} from "redux";
import {profileReducer} from "./redusers/profile-reducer";
import {loginReducer} from "./redusers/login-reducer";
import {registerReducer} from "./redusers/register-reducer";
import {createPasswordReducer} from "./redusers/createPassword-reducer";
import {enterPasswordReducer} from "./redusers/enterPassword-reducer";
import {recoveryPasswordReducer} from "./redusers/recoveryPassword-reducer";


export const rootReducer  = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    register: registerReducer,
    createPassword: createPasswordReducer,
    enterPassword: enterPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)