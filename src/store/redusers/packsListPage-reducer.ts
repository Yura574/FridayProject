import {Dispatch} from "redux";
import {packsListPageAPI} from "../../api/neko-cards-api";
import {AppRootStateType} from "../store";


export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
}

export type PacksListType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}


export type PacksListPageType = {
    packsList: PacksListType
    searchValue: string
}


const packsListInitialState: PacksListPageType = {
    packsList: {
        cardPacks: [],
        cardPacksTotalCount: 0,
        maxCardsCount: 0,
        minCardsCount: 0,
        page: 1,
        pageCount: 1,
    },
    searchValue: ''
}

export const packsListReducer = (state: PacksListPageType = packsListInitialState, action: PacksListPageActionType): PacksListPageType => {
    switch (action.type) {
        case "UPDATE-PACK-LIST":
            return {...state, packsList: action.packsList}
        case "SET-SEARCH-VALUE":
            return {...state, searchValue: action.searchValue}
        default:
            return state
    }
}

export const GetPacksListAC = (packsList: PacksListType) => {
    return {type: 'UPDATE-PACK-LIST', packsList} as const
}
export const SetSearchValueAC = (searchValue: string) => {
    return {type: 'SET-SEARCH-VALUE', searchValue} as const
}

export type UpdatePacksListAT = ReturnType<typeof GetPacksListAC>
export type SetSearchValueAT = ReturnType<typeof SetSearchValueAC>

export type PacksListPageActionType = UpdatePacksListAT | SetSearchValueAT

export const GetPacksListTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    packsListPageAPI.getPacksList(getState().packsList.searchValue)
        .then((res) => {
            dispatch(GetPacksListAC(res.data))
        })
}