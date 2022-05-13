import {Dispatch} from "redux";
import {nekoCardsAPI} from "../../api/neko-cards-api";
import {setIsAuth} from "./login-reducer";
import {setDisabled, setIsLoader, setMessageError} from "./app-reducer";


const initialState = {
    profile: {
        avatar: 'https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg',
        created: new Date(),
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 4,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: new Date(),
        verified: false,
        __v: 0,
        _id: ''
    }
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PROFILE": {
            const {
                avatar, created, email, isAdmin, name, publicCardPacksCount,
                rememberMe, token, tokenDeathTime, updated, verified, __v, _id
            } = action.profile
            return {
                ...state,
                profile: {
                    avatar, created, email, isAdmin, name, publicCardPacksCount,
                    rememberMe, token, tokenDeathTime, updated, verified, __v, _id
                }
            }
        }
        case"EDIT_PROFILE":
            const {name, avatar} = action
            return {...state, profile: {...state.profile, name, avatar}}
        default:
            return state
    }
}

// actions
export const setProfile = (profile: ProfileType) => {
    return {
        type: "SET_PROFILE",
        profile
    } as const
}
export const editProfile = (name: string, avatar: string) => {
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
            dispatch(editProfile(name, avatar))

        })
}

export const loginTC = (dataLogin: DataLoginType) => (dispatch: Dispatch) => {
    dispatch(setIsLoader(true))
    dispatch(setDisabled(true))
    nekoCardsAPI.login(dataLogin)
        .then(res => {
            const {name, email, avatar} = res.data
            dispatch(setProfile(res.data))
            dispatch(setIsAuth(true))
        })
        .catch(error => {
            dispatch(setMessageError(error.response.data.error))
            setTimeout(() => {
                dispatch(setMessageError(''))
            }, 3000)
        })
        .finally(() => {
            dispatch(setIsLoader(false))
            dispatch(setDisabled(false))
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setIsLoader(true))
    nekoCardsAPI.logout()
        .then(res => {
            const profile = {
                avatar: 'https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg',
                created: new Date(),
                email: '',
                isAdmin: false,
                name: '',
                publicCardPacksCount: 4,
                rememberMe: false,
                token: '',
                tokenDeathTime: 0,
                updated: new Date(),
                verified: false,
                __v: 0,
                _id: ''
            }
            dispatch(setProfile(profile))
            dispatch(setIsAuth(false))
        })
        .catch(error => {
            dispatch(setMessageError(error.message.payload.messageError))
        })
        .finally(() => {
            dispatch(setIsLoader(false))
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

export type ProfileType = {
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
    updatedUser: ProfileType
}

