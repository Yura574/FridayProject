import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./redusers/profile-reducer";
import {loginReducer} from "./redusers/login-reducer";
import {registrationReducer} from "./redusers/registration-reducer";
import {enterPasswordReducer} from "./redusers/enterPassword-reducer";
import {recoveryPasswordReducer} from "./redusers/recoveryPassword-reducer";
import thunkMiddleware from "redux-thunk";
import {setNewPasswordReducer} from "./redusers/setNewPassword-reducer";
import {appReducer} from "./redusers/app-reducer";
import {packsListReducer} from "./redusers/packsListPage-reducer";
import {cardsReducer} from "./redusers/cards-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';


export const rootReducer  = combineReducers({
    app: appReducer,
    profile: profileReducer,
    login: loginReducer,
    registration: registrationReducer,
    enterPassword: enterPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    setNewPassword: setNewPasswordReducer,
    packsList: packsListReducer,
    cards: cardsReducer,
})


export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


// @ts-ignore
window.store = store