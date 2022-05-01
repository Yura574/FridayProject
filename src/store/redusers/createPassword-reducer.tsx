
export type CreatePasswordInitialStateType = {
    email: string
    password: string
}

const createPasswordInitialState: CreatePasswordInitialStateType = {
    email: '',
    password: '',
}

export const createPasswordReducer = (state: CreatePasswordInitialStateType = createPasswordInitialState, action: CreatePasswordActionType): CreatePasswordInitialStateType => {
    switch (action.type) {
        case 'REGISTRATION':
            return {...state, email: action.email, password: action.password}
        default:
            return state
    }
}

export const RegistrationAC = (email: string, password: string) => {
    return {type: 'REGISTRATION', email, password} as const
}

export type RegistrationAT = ReturnType<typeof RegistrationAC>

export type CreatePasswordActionType = RegistrationAT