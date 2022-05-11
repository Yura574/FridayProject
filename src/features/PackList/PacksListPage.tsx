import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import s from './PacksListPage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {
    AddPackTC, DeletePackTC,
    GetPacksListTC, PacksListPageType,
    SetSearchValueAC, UpdatePackTC
} from "../../store/redusers/packsListPage-reducer";
import {useDebouncedCallback} from "use-debounce";

export const PacksListPage = () => {
    const packsList = useSelector<AppRootStateType, PacksListPageType>(state => state.packsList)
    const searchValue = useSelector<AppRootStateType, string>(state => state.packsList.searchValue)
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
    }, [searchValue])

    useEffect(() => {
        dispatch(SetSearchValueAC(searchInput))
    }, [searchInput])

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        debounced(e.currentTarget.value)
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
                    <div className={s.column}>Updated</div>
                    <div className={s.column}>Actions</div>
                </div>
                <div className={s.tableBody}>
                    {packsList.packsList.cardPacks.map(p => {
                            return <CardPack pack={p}/>
                        }
                    )}
                </div>
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

    return <div className={s.tableData} key={_id}>
        {isEditNamePack ?
            <input autoFocus onBlur={() => setIsEditNamePack(false)} value={title}
                   onChange={(e) => setName(e.currentTarget.value)}/>
            : <div className={s.column} onClick={() => setIsEditNamePack(true)}>{name}</div>}
        <div className={s.column}>{cardsCount}</div>
        <div className={s.column}>{updated}</div>
        <div className={s.column}>
            <button onClick={() => editPack(_id, title)}>Edit</button>
            <button onClick={() => deletePack(_id)}>Delete</button>
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