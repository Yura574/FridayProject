
enum AppActionType {
    SET_IS_LOADER = 'AppActionType/SET_IS_LOADER',
    SET_DISABLED = 'AppActionType/SET_DISABLED',
    SET_MESSAGE_ERROR = 'AppActionType/SET_MESSAGE_ERROR',
    SET_INITIALIZED_CARD_PACK = 'AppActionType/SET_INITIALIZED_CARD_PACK',
}

type InitialStateType = {
    isLoading: boolean,
    isDisabled: boolean,
    messageError: string,
    setInitializedCardPack: boolean
}

const initialState: InitialStateType = {
    isLoading: false,
    isDisabled: false,
    messageError: '',
    setInitializedCardPack: false
}

type AppReducerActionType = SetIsLoadingType | SetIsDisabledType | SetMessageErrorType | SetInitializedCardPack;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case AppActionType.SET_IS_LOADER:
        case AppActionType.SET_DISABLED:
        case AppActionType.SET_MESSAGE_ERROR:
        case AppActionType.SET_INITIALIZED_CARD_PACK:
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
export type SetInitializedCardPack = ReturnType<typeof setInitializedCardPack>
export const setInitializedCardPack = (setInitializedCardPack: boolean)=> {
    return {
        type: AppActionType.SET_INITIALIZED_CARD_PACK,
        payload: {
            setInitializedCardPack
        }
    }
}
