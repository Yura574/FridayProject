import {nekoCardsAPI} from '../../api/neko-cards-api';
import {Dispatch} from 'redux';
import {setIsLoader, SetIsLoadingType} from "./app-reducer";

enum SetNewPasswordAction {
    SET_IS_SUCCESS = 'SetNewPassword/SET_IS_SUCCESS',
    SET_ERROR_MESSAGE = 'SetNewPassword/SET_ERROR_MESSAGE',
}

type InitialStateType = {
    isSuccess: boolean,
    errorMessage: string | null,
}

const initialState: InitialStateType = {
    isSuccess: false,
    errorMessage: null,
}

type SetNewPasswordActionType = SetSuccessMessageType
                              | SetErrorMessageType
                              | SetIsLoadingType;

export const setNewPasswordReducer = (state: InitialStateType = initialState, action: SetNewPasswordActionType): InitialStateType => {
    switch (action.type) {
        case SetNewPasswordAction.SET_IS_SUCCESS :
        case SetNewPasswordAction.SET_ERROR_MESSAGE:
            return {...state, ...action.payload};
        default:
            return state
    }
}

type SetSuccessMessageType = ReturnType<typeof setIsSuccess>;
export const setIsSuccess = (isSuccess: boolean) => {
    return {
        type: SetNewPasswordAction.SET_IS_SUCCESS,
        payload: {
            isSuccess,
        },
    } as const
}

type SetErrorMessageType = ReturnType<typeof setErrorMessage>;
export const setErrorMessage = (errorMessage: string | null) => {
    return {
        type: SetNewPasswordAction.SET_ERROR_MESSAGE,
        payload: {
            errorMessage,
        },
    } as const
}

export const setNewPassword = (password: string, token: string) => (dispatch: Dispatch<SetNewPasswordActionType>) => {
    dispatch(setIsLoader(true));
    nekoCardsAPI.setNewPassword(password, token)
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