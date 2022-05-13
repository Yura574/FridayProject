import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {SetUserIdForPacksSearchingAC} from "../../store/redusers/packsListPage-reducer";

export const PacksOwnerSelector = () => {
    const userId = useSelector<AppRootStateType, string>(state => state.profile._id)
    const dispatch: AppDispatch = useDispatch()

    const onClickHandler = (id: string) => {
        dispatch(SetUserIdForPacksSearchingAC(id))
    }

    return (
        <div>
            <button onClick={() => onClickHandler(userId)}>My packs</button>
            <button onClick={() => onClickHandler('')}>All packs</button>
        </div>
    );
}