import {Dispatch} from "redux";
import {nekoCardsAPI} from "../../api/neko-cards-api";
import {setIsAuth} from "./login-reducer";


const initialState = {
    _id: '',
    name: '',
    email: '',
    avatar: 'https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PROFILE":{
            return {...state, _id: action._id, name: action.name, email: action.email,  avatar: action.avatar}
        }

        case "EDIT_PROFILE":
            return {...state, name: action.name,  avatar: action.avatar}


        default:
            return state
    }
}

// actions
export const setProfile = (_id: string, name: string, email: string, avatar: string) => {
    return {
        type: "SET_PROFILE",
        _id,
        name,
        email,
        avatar
    } as const
}
export const editProfile = (name: string,  avatar: string) => {
    return {
        type: "EDIT_PROFILE",
        name,
        avatar
    } as const
}


//thunks


export const editProfileTC = (data: DataType) => (dispatch: Dispatch) => {
    nekoCardsAPI.editProfile(data)
        .then(res => {
            const {name, avatar} = res.data.updatedUser
            dispatch(editProfile(name,  avatar))

        })
}

export const loginTC =(dataLogin: DataLoginType) => (dispatch: Dispatch) => {
    nekoCardsAPI.login(dataLogin)
        .then(res => {
            const {_id, name, email, avatar} = res.data
            dispatch(setProfile(_id, name, email, avatar))
            dispatch(setIsAuth(true))

        })
}
export const logoutTC =() => (dispatch: Dispatch) => {
    nekoCardsAPI.logout()
        .then(res => {

            dispatch(setProfile('', '', '', ''))
            dispatch(setIsAuth(false))

        })
}


//types
type InitialStateType = typeof initialState
type ActionType = SetProfileType | EditProfileType

type EditProfileType = ReturnType<typeof editProfile>
type SetProfileType = ReturnType<typeof setProfile>
export type DataType = {
    name: string,
    avatar: string
}
export type DataLoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type ProfileResponseType = {
    avatar: string
    created: Date
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: Date
    verified: boolean
    __v: number
    _id: string
}

export type UpdateProfileResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: ProfileResponseType
}

