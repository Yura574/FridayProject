
enum AppActionType {
    SET_IS_LOADER = 'AppActionType/SET_IS_LOADER',
    SET_DISABLED = 'AppActionType/SET_DISABLED',
    SET_MESSAGE_ERROR = 'AppActionType/SET_MESSAGE_ERROR',
}

type InitialStateType = {
    isLoading: boolean,
    isDisabled: boolean,
    messageError: string,
}

const initialState: InitialStateType = {
    isLoading: false,
    isDisabled: false,
    messageError: '',
}

type AppReducerActionType = SetIsLoadingType | SetIsDisabledType | SetMessageErrorType;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case AppActionType.SET_IS_LOADER:
        case AppActionType.SET_DISABLED:
        case AppActionType.SET_MESSAGE_ERROR:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export type SetIsLoadingType = ReturnType<typeof setIsLoader>;
export const setIsLoader = (isLoading: boolean) => {
    return {
        type: AppActionType.SET_IS_LOADER,
        payload: {
            isLoading,
        },
    } as const
}
export type SetIsDisabledType = ReturnType<typeof setDisabled>
export const setDisabled = (isDisabled: boolean) => {
    return {
        type: AppActionType.SET_DISABLED,
        payload: {
            isDisabled,
        },
    } as const
}
export type SetMessageErrorType = ReturnType<typeof setMessageError>
export const setMessageError = (messageError: string) => {
    return {
        type: AppActionType.SET_MESSAGE_ERROR,
        payload: {
            messageError,
        },
    } as const
}
