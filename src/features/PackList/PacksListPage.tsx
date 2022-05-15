import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import s from './PacksListPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {
    GetPacksListTC, PacksListPageType, SetCurrentPageAC, SetItemsQuantityOnPageAC,
    SetSearchValueAC, SortPacksByDateAC
} from "../../store/redusers/packsListPage-reducer";
import {useDebouncedCallback} from "use-debounce";
import {CardsCountSlider} from "./CardsCountSlider";
import {Pagination} from "../../CommonComponents/c5-Pagination/Pagination";
import {CardPack} from "./CardPack";
import {Navigate} from "react-router-dom";
import {PacksOwnerSelector} from "./PacksOwnerSelector";
import {ModalUp} from "../Modal/CommonModal/ModalUp/ModalUp";
import { AddPackModalContainer } from '../Modal/ModalPackList/AddPackModalContainer';

export const PacksListPage = () => {
    const isAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAuth)
    const packsList = useSelector<AppRootStateType, PacksListPageType>(state => state.packsList)
    const searchValue = useSelector<AppRootStateType, string>(state => state.packsList.searchValue)
    const dispatch: AppDispatch = useDispatch()


    const [searchInput, setSearchInput] = useState<string>('')
    const debounced = useDebouncedCallback(
        useCallback((searchInput: string) => {
            setSearchInput(searchInput)
        }, []),
        1500)

    useEffect(() => {
        dispatch(GetPacksListTC())
    }, [
        packsList.searchValue,
        packsList.searchMinCardsCount,
        packsList.searchMaxCardsCount,
        packsList.sortPacks,
        packsList.page,
        packsList.packsOnPageCount,
        packsList.packsList.cardPacksTotalCount,
        packsList.userIdForSearching
    ])

    useEffect(() => {
        dispatch(SetSearchValueAC(searchInput))
    }, [searchInput])

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debounced(e.currentTarget.value)
    }
    const sortPacksByDateUp = () => {
        dispatch(SortPacksByDateAC('0updated'))
    }
    const sortPacksByDateDown = () => {
        dispatch(SortPacksByDateAC('1updated'))
    }
    const changePage = (pageNumber: number) => {
        dispatch(SetCurrentPageAC(pageNumber))
    }


    if (!isAuth) {
        return <Navigate to={'/login'}/>
    }


    return (
        <div className={s.main}>
            <div className={s.header}>
                <PacksOwnerSelector/>
                <div className={s.slider}>
                    <CardsCountSlider/>
                </div>
                <input
                    placeholder={'search'}
                    onChange={searchHandler}
                />
                <div>

                    <AddPackModalContainer/>
                </div>
            </div>
            <div className={s.table}>
                <div className={s.header}>
                    <div className={s.column}>Name</div>
                    <div className={s.column}>Cards</div>
                    <div>
                        <div className={s.column}>Updated</div>
                        <button onClick={sortPacksByDateUp}>^</button>
                        <button onClick={sortPacksByDateDown}>v</button>
                    </div>
                    <div className={s.column}>Actions</div>
                </div>
                <div className={s.tableBody}>
                    {packsList.packsList.cardPacks.map(p => {
                            return <CardPack
                                key={p._id}
                                pack={p}
                            />
                        }
                    )}
                </div>
            </div>
            <Pagination
                totalElementsCount={packsList.packsList.cardPacksTotalCount}
                elementsOnPageCount={packsList.packsList.pageCount}
                currentPage={packsList.packsList.page}
                buttonsQuantity={10}
                changePage={changePage}
            />
            <div>
                Show
                <select defaultValue={10} onChange={(e) => dispatch(SetItemsQuantityOnPageAC(+e.currentTarget.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={200}>200</option>
                </select>
                items per page
            </div>
<ModalUp/>
        </div>
    )
}