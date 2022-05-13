import React, {useState} from 'react';
import {AppDispatch, AppRootStateType} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {DeletePackTC, UpdatePackTC} from "../../store/redusers/packsListPage-reducer";
import s from "./PacksListPage.module.css";
import {NavLink} from "react-router-dom";

type CardPackType = {
    pack: {
        user_id: string
        _id: string
        name: string
        cardsCount: number
        updated: any
    }
}

export const CardPack = (props: CardPackType) => {
    const {name, cardsCount, _id, updated, user_id} = props.pack

    const userId = useSelector<AppRootStateType, string>(state => state.profile.profile._id)
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
            {user_id === userId &&
                <>
                    <button onClick={() => editPack(_id, title)}>Edit</button>
                    <button onClick={() => deletePack(_id)}>Delete</button>
                </>
            }
            <NavLink to={`/cards/${_id}`}
                     className={({isActive}) => isActive ? s.active : s.link}><button>Show cards</button></NavLink>

        </div>
    </div>
}