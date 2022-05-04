import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./redusers/profile-reducer";
import {loginReducer} from "./redusers/login-reducer";
import {registrationReducer} from "./redusers/registration-reducer";
import {enterPasswordReducer} from "./redusers/enterPassword-reducer";
import {recoveryPasswordReducer} from "./redusers/recoveryPassword-reducer";
import thunkMiddleware from "redux-thunk";
import {SetNewPasswordReducer} from "./redusers/setNewPassword-reducer";


export const rootReducer  = combineReducers({
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
    enterPassword: enterPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    setNewPassword: SetNewPasswordReducer,
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store