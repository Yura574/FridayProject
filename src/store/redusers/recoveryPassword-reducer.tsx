import {Dispatch} from 'redux';
import {nekoCardsAPI} from '../../api/neko-cards-api';
import {setIsLoader, SetIsLoadingType} from "./app-reducer";

enum RecoveryPasswordAction {
    SET_IS_SUCCESS = 'RecoveryPassword/SET_IS_SUCCESS',
    SET_ERROR_MESSAGE = 'RecoveryPassword/SET_ERROR_MESSAGE',
}

type InitialStateType = {
    isSuccess: boolean,
    errorMessage: string | null,
}

const initialState: InitialStateType = {
    isSuccess: false,
    errorMessage: null,
}

type RecoveryPasswordActionType = SetSuccessMessageType
                                | SetErrorMessageType
                                | SetIsLoadingType;

export const recoveryPasswordReducer = (state: InitialStateType = initialState, action: RecoveryPasswordActionType): InitialStateType => {
    switch (action.type) {
        case RecoveryPasswordAction.SET_IS_SUCCESS :
        case RecoveryPasswordAction.SET_ERROR_MESSAGE:
            return {...state, ...action.payload};
        default:
            return state
    }
}

type SetSuccessMessageType = ReturnType<typeof setIsSuccess>;
export const setIsSuccess = (isSuccess: boolean) => {
    return {
        type: RecoveryPasswordAction.SET_IS_SUCCESS,
        payload: {
            isSuccess,
        },
    } as const
}

type SetErrorMessageType = ReturnType<typeof setErrorMessage>;
export const setErrorMessage = (errorMessage: string | null) => {
    return {
        type: RecoveryPasswordAction.SET_ERROR_MESSAGE,
        payload: {
            errorMessage,
        },
    } as const
}

export const requestNewPassword = (email: string) => (dispatch: Dispatch<RecoveryPasswordActionType>) => {
    dispatch(setIsLoader(true));
    nekoCardsAPI.requestNewPassword(email)
        .then(({data}) => {
            dispatch(setIsSuccess(!!data.info));
        })
        .catch(({response}) => {
            dispatch(setErrorMessage(response.data.error));
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        });
}