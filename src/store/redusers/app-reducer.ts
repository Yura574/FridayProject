
enum AppActionType {
    SET_IS_LOADER = 'AppActionType/SET_IS_LOADER',
}

type InitialStateType = {
    isLoading: boolean,
}

const initialState: InitialStateType = {
    isLoading: false,
}

type AppReducerActionType = SetIsLoadingType;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionType): InitialStateType => {
    switch (action.type) {
        case AppActionType.SET_IS_LOADER:
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
