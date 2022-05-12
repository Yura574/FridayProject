import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import s from './PacksListPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {
    AddPackTC, DeletePackTC,
    GetPacksListTC, PacksListPageType, SetCurrentPageAC, SetItemsQuantityOnPageAC,
    SetSearchValueAC, SortPacksByDateAC, UpdatePackTC
} from "../../store/redusers/packsListPage-reducer";
import {useDebouncedCallback} from "use-debounce";
import {CardsCountSlider} from "./CardsCountSlider";
import {Pagination} from "../../CommonComponents/c5-Pagination/Pagination";

export const PacksListPage = () => {
    const packsList = useSelector<AppRootStateType, PacksListPageType>(state => state.packsList)
    const searchValue = useSelector<AppRootStateType, string>(state => state.packsList.searchValue)
    const searchMinCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.searchMinCardsCount)
    const searchMaxCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.searchMaxCardsCount)
    const sortPacks = useSelector<AppRootStateType, string>(state => state.packsList.sortPacks)
    const currentPage = useSelector<AppRootStateType, number>(state => state.packsList.page)
    const packsOnPageCount = useSelector<AppRootStateType, number>(state => state.packsList.packsOnPageCount)
    const dispatch: AppDispatch = useDispatch()

    const [titlePack, setTitlePack] = useState<string>('')
    const [searchInput, setSearchInput] = useState<string>('')
    const debounced = useDebouncedCallback(
        useCallback((searchInput: string) => {
            setSearchInput(searchInput)
        }, []),
        1500)

    useEffect(() => {
        dispatch(GetPacksListTC())
    }, [searchValue, searchMinCardsCount, searchMaxCardsCount, sortPacks, currentPage, packsOnPageCount])

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
    const titlePackHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitlePack(e.currentTarget.value)
    }
    const addPack = () => {
        dispatch(AddPackTC({name: titlePack, private: false, deckCover: ''}))
    }

    return (
        <div className={s.main}>
            <div className={s.header}>
                <div className={s.slider}>
                    <CardsCountSlider />
                </div>
                <input
                    placeholder={'search'}
                    onChange={searchHandler}
                />
                <div>
                    <input value={titlePack} onChange={titlePackHandler}/>
                    <button onClick={addPack}>add pack</button>
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
                            return <CardPack pack={p} key={p._id}/>
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
                <select onChange={(e) => dispatch(SetItemsQuantityOnPageAC(+e.currentTarget.value))}>
                    <option value={5}>5</option>
                    <option selected value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
                items per page
            </div>
        </div>
    )
}

const CardPack = (props: CardPackType) => {
    const dispatch: AppDispatch = useDispatch()
    const {name, cardsCount, _id, updated} = props.pack
    const [isEditNamePack, setIsEditNamePack] = useState<boolean>(false)
    const [title, setName] = useState<string>(name)
    const deletePack = (packId: string) => {
        dispatch(DeletePackTC(packId))
    }
    const editPack = (packId: string, name: string) => {
        dispatch(UpdatePackTC(packId, name))
        setIsEditNamePack(false)
    }

    return <div className={s.tableData}>
        {isEditNamePack ?
            <input autoFocus onBlur={() => setIsEditNamePack(false)} value={title}
                   onChange={(e) => setName(e.currentTarget.value)}/>
            : <div className={s.column} onClick={() => setIsEditNamePack(true)}>{name}</div>}
        <div className={s.column}>{cardsCount}</div>
        <div className={s.column}>{updated}</div>
        <div className={s.column}>
            <button onClick={() => editPack(_id, title)}>Edit</button>
            <button onClick={() => deletePack(_id)}>Delete</button>
            <button></button>
        </div>
    </div>
}
type CardPackType = {
    pack: {
        _id: string
        name: string
        cardsCount: number
        updated: any
    }
}