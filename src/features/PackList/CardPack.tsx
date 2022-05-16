import React from 'react';
import { AppRootStateType} from "../../store/store";
import { useSelector} from "react-redux";
import s from "./PacksListPage.module.css";
import {NavLink} from "react-router-dom";
import {DeletePackModalContainer} from "../Modal/ModalPackList/DeletePackModalContainer";
import {UpdatePackModalContainer} from "../Modal/ModalPackList/UpdatePackModalContainer";

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

    const date = updated[8] + updated[9] + '.' + updated[5] + updated[6] + '.' + updated.slice(0, 4) + ' ' + updated.slice(11, 16)

    return <div className={s.tableData}>
        <NavLink to={`/cards/${_id}`} className={s.navlink}>
            <div>{name}</div>
        </NavLink>
        <div className={s.column}>{cardsCount}</div>
        <div className={s.column}>{date}</div>
        <div className={s.column}>
            {user_id === userId &&
                <>
                    <UpdatePackModalContainer name={name} packId={_id}/>
                    <DeletePackModalContainer id={_id} name={name}/>
                </>
            }
        </div>
    </div>
}