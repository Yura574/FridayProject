import {Dispatch} from "redux";
import {nekoCardsAPI} from "../../api/neko-cards-api";

export type CreatePasswordInitialStateType = {
    email: string
    password: string
    serverError: string
}

const createPasswordInitialState: CreatePasswordInitialStateType = {
    email: '',
    password: '',
    serverError: '',
}

export const registrationReducer = (state: CreatePasswordInitialStateType = createPasswordInitialState, action: CreatePasswordActionType): CreatePasswordInitialStateType => {
    switch (action.type) {
        case 'REGISTRATION':
            return {...state, email: action.email, password: action.password}
        case 'SET-SERVER-ERROR':
            return {...state, serverError: action.error}
        default:
            return state
    }
}

export const RegistrationAC = (email: string, password: string) => {
    return {type: 'REGISTRATION', email, password} as const
}
export const SetServerErrorAC = (error: string) => {
    return {type: 'SET-SERVER-ERROR', error} as const
}

export type RegistrationAT = ReturnType<typeof RegistrationAC>
export type SetServerErrorAT = ReturnType<typeof SetServerErrorAC>

export type CreatePasswordActionType = RegistrationAT | SetServerErrorAT

export const RegistrationTC = (email: string, password: string) => (dispatch: Dispatch) => {
    nekoCardsAPI.registration(email, password)
        .then(() => {
            dispatch(RegistrationAC(email, password))
        })
        .catch((err) => {
            const registerError: RegistrationErrorType = err.response.data
            dispatch(SetServerErrorAC(registerError.error))
        })
}

export type RegistrationErrorType = {
    emailRegExp: {}
    error: string
    in: string
    isEmailValid: true
    isPassValid: false
    passwordRegExp: string
}