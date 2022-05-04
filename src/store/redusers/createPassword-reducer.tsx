import {Dispatch} from "redux";
import {API, RegisterErrorType} from "../../api/CreateNewPasswordApi";

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

export const createPasswordReducer = (state: CreatePasswordInitialStateType = createPasswordInitialState, action: CreatePasswordActionType): CreatePasswordInitialStateType => {
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
    API.register(email, password)
        .then(res => {
            dispatch(RegistrationAC(email, password))
        })
        .catch((err) => {
            const registerError: RegisterErrorType = err.response.data
            dispatch(SetServerErrorAC(registerError.error))
        })
}