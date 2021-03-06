import {Dispatch} from "redux";
import {packsListPageAPI} from "../../api/neko-cards-api";
import {AppDispatch, AppRootStateType} from "../store";
import {setIsLoader} from "./app-reducer";

export type NewPackType = {
    name: string
    deckCover?: string
    private?: false
}
export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    deckCover: string
    grade: number
    user_name: string
    more_id: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    __v: number
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
    searchMinCardsCount: number
    searchMaxCardsCount: number
    sortPacks: string
    page: number
    packsOnPageCount: number
    userIdForSearching: string
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
    searchValue: '',
    searchMinCardsCount: 0,
    searchMaxCardsCount: 0,
    sortPacks: '',
    page: 1,
    packsOnPageCount: 10,
    userIdForSearching: '',
}

export const packsListReducer = (state: PacksListPageType = packsListInitialState, action: PacksListPageActionType): PacksListPageType => {
    switch (action.type) {
        case "UPDATE-PACK-LIST":
            return {...state, packsList: action.packsList}
        case "SET-SEARCH-VALUE":
            return {...state, searchValue: action.searchValue}
        case "SEARCH-BY-CARDS-COUNT":
            return {
                ...state,
                searchMinCardsCount: action.searchMinCardsCount,
                searchMaxCardsCount: action.searchMaxCardsCount
            }
        case "SORT-PACKS-BY-DATE":
            return {...state, sortPacks: action.sortDirection}
        case "SET-CURRENT-PAGE":
            return {...state, page: action.pageNumber}
        case "SET-ITEMS-QUANTITY-ON-PAGE":
            return {...state, packsOnPageCount: action.itemsQuantity}
        case "SET-USER-ID-FOR-PACKS-SEARCHING":
            return {...state, userIdForSearching: action.id}
        case "ADD-NEW-PACK":
            return {
                ...state, packsList: {...state.packsList, cardPacks: [action.newPack, ...state.packsList.cardPacks]}
            }
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
export const SearchByCardsCountAC = (searchMinCardsCount: number, searchMaxCardsCount: number) => {
    return {type: 'SEARCH-BY-CARDS-COUNT', searchMinCardsCount, searchMaxCardsCount} as const
}
export const SortPacksByDateAC = (sortDirection: string) => {
    return {type: 'SORT-PACKS-BY-DATE', sortDirection} as const
}
export const SetCurrentPageAC = (pageNumber: number) => {
    return {type: 'SET-CURRENT-PAGE', pageNumber} as const
}
export const SetItemsQuantityOnPageAC = (itemsQuantity: number) => {
    return {type: 'SET-ITEMS-QUANTITY-ON-PAGE', itemsQuantity} as const
}
export const SetUserIdForPacksSearchingAC = (id: string) => {
    return {type: 'SET-USER-ID-FOR-PACKS-SEARCHING', id} as const
}
export const AddNewPacksAC = (newPack: PackType) => {
    return {type: 'ADD-NEW-PACK', newPack} as const
}

export type UpdatePacksListAT = ReturnType<typeof GetPacksListAC>
export type SetSearchValueAT = ReturnType<typeof SetSearchValueAC>
export type SearchByCardsCountAT = ReturnType<typeof SearchByCardsCountAC>
export type SortPacksByDateAT = ReturnType<typeof SortPacksByDateAC>
export type SetCurrentPageAT = ReturnType<typeof SetCurrentPageAC>
export type SetItemsQuantityOnPageAT = ReturnType<typeof SetItemsQuantityOnPageAC>
export type SetUserIdForPacksSearchingAT = ReturnType<typeof SetUserIdForPacksSearchingAC>
export type AddNewPackType = ReturnType<typeof AddNewPacksAC>

export type PacksListPageActionType = UpdatePacksListAT
    | SetSearchValueAT
    | SearchByCardsCountAT
    | SortPacksByDateAT
    | SetCurrentPageAT
    | SetItemsQuantityOnPageAT
    | SetUserIdForPacksSearchingAT
    | AddNewPackType

export const GetPacksListTC = () => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setIsLoader(true));
    packsListPageAPI.getPacksList(
        getState().packsList.searchValue,
        getState().packsList.searchMinCardsCount,
        getState().packsList.searchMaxCardsCount,
        getState().packsList.sortPacks,
        getState().packsList.page,
        getState().packsList.packsOnPageCount,
        getState().packsList.userIdForSearching,
    )
        .then((res) => {
            dispatch(GetPacksListAC(res.data))
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        });
}
export const AddPackTC = (newPack: NewPackType) => (dispatch: Dispatch) => {
    dispatch(setIsLoader(true));
    packsListPageAPI.addNewPack(newPack)
        .then(res => {
            dispatch(AddNewPacksAC(res.data.newCardsPack))
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        });
}
export const DeletePackTC = (packId: string) => (dispatch: AppDispatch) => {
    dispatch(setIsLoader(true));
    packsListPageAPI.deletePack(packId)
        .then(() => {
            dispatch(GetPacksListTC())
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        });
}

export const UpdatePackTC = (packId: string, name: string) => (dispatch: AppDispatch, getState: () => AppRootStateType) => {
    dispatch(setIsLoader(true));
    let newUpdatePack = getState().packsList.packsList.cardPacks.find(el => el._id === packId)

    if (newUpdatePack) {
        newUpdatePack.name = name
        packsListPageAPI.updatePack(newUpdatePack)
            .then(() => {
                dispatch(GetPacksListTC())
            })
            .finally(() => {
                dispatch(setIsLoader(false));
            });
    }
}