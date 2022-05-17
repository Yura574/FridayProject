import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {SearchByCardsCountAC, SetUserIdForPacksSearchingAC} from "../../store/redusers/packsListPage-reducer";
import s from "./PacksListPage.module.css"

export const PacksOwnerSelector = () => {
    const userId = useSelector<AppRootStateType, string>(state => state.profile.profile._id);
    const userIdForSearching = useSelector<AppRootStateType, string>(state => state.packsList.userIdForSearching);
    const minCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.packsList.minCardsCount);
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.packsList.maxCardsCount);
    const dispatch: AppDispatch = useDispatch()

    const onClickHandler = (id: string) => {
        dispatch(SearchByCardsCountAC(minCardsCount, maxCardsCount))
        dispatch(SetUserIdForPacksSearchingAC(id))
    }

    return (
        <div>
            <button
                className={userIdForSearching === '' ? '' : s.activeButton}
                onClick={() => onClickHandler(userId)}
            >My packs
            </button>
            <button
                className={userIdForSearching === '' ? s.activeButton : ''}
                onClick={() => onClickHandler('')}>All packs
            </button>
        </div>
    )
}