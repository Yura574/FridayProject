import React, {useState} from 'react';
import {AppDispatch} from "../../store/store";
import {useDispatch} from "react-redux";
import {DeletePackTC, UpdatePackTC} from "../../store/redusers/packsListPage-reducer";
import s from "./PacksListPage.module.css";

type CardPackType = {
    pack: {
        _id: string
        name: string
        cardsCount: number
        updated: any
    }
}

export const CardPack = (props: CardPackType) => {
    const {name, cardsCount, _id, updated} = props.pack

    const dispatch: AppDispatch = useDispatch()

    const [isEditNamePack, setIsEditNamePack] = useState<boolean>(false)
    const [title, setName] = useState<string>(name)

    const date = updated[8] + updated[9] + '.' + updated[5] + updated[6] + '.' + updated.slice(0, 4) + ' ' + updated.slice(11, 16)

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
        <div className={s.column}>{date}</div>
        <div className={s.column}>
            <button onClick={() => editPack(_id, title)}>Edit</button>
            <button onClick={() => deletePack(_id)}>Delete</button>
            <button>Show cards</button>
        </div>
    </div>
}