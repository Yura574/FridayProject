import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './PacksListPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {
    GetPacksListTC, PacksListPageType,
    SetSearchValueAC
} from "../../store/redusers/packsListPage-reducer";

export const PacksListPage = () => {
    const packsList = useSelector<AppRootStateType, PacksListPageType>(state => state.packsList)
    const searchValue = useSelector<AppRootStateType, string>(state => state.packsList.searchValue)
    const dispatch: AppDispatch = useDispatch()

    const [timerId, setTimerId] = useState<number>(0)
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        dispatch(GetPacksListTC())
    }, [searchValue])

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        window.clearTimeout(timerId)
        setSearchInput(e.currentTarget.value)
        const id: number = window.setTimeout(() => {
            dispatch(SetSearchValueAC(searchInput))
        }, 1500)
        setTimerId(id)
    }


    return (
        <div className={s.main}>
            <input
                placeholder={'search'}
                value={searchInput}
                onChange={searchHandler}
            />
            <div className={s.table}>
                <div className={s.header}>
                    <div className={s.column}>Name</div>
                    <div className={s.column}>Cards</div>
                    <div className={s.column}>Updated</div>
                    <div className={s.column}>Actions</div>
                </div>
                <div className={s.tableBody}>
                    {packsList.packsList.cardPacks.map(p => {
                            return <div className={s.tableData} key={p._id}>
                                <div className={s.column}>{p.name}</div>
                                <div className={s.column}>{p.cardsCount}</div>
                                <div className={s.column}>{p.updated}</div>
                                <div className={s.column}>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </div>
                        }
                    )}
                </div>
            </div>
        </div>
    )
}