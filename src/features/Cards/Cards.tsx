import React, {useEffect, useState} from 'react';
import s from './Cards.module.css';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {addCard, CardType, deleteCard, getCards, updateCard} from "../../store/redusers/cards-reducer";
import {AddCardModalContainer} from "../Modal/ModalCards/AddCardModalContainer";
import {DeleteCardModalContainer} from "../Modal/ModalCards/DeleteCardModalContainer";
import {UpdateCardModalContainer} from "../Modal/ModalCards/UpdateCardModalContainer";

export const Cards = () => {
    const {cardsPack_id} = useParams();
    // const [question, setQuestion] = useState('');
    // const [answer, setAnswer] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards);




    const cardsBodyTable = cards.map(card => {

        const buttons = <td>
            <DeleteCardModalContainer cardsPack_id={card.cardsPack_id}
                                      card_id={card._id}
                                      defaultQuestion={card.question}
            />
            <UpdateCardModalContainer cardsPack_id={card.cardsPack_id}
                                      card_id={card._id}
                                      defaultQuestion={card.question}
                                      defaultAnswer={card.answer}
            />
        </td>

        return (
            <tr key={card._id} className={s.tableRow}>
                <td>{card.question}</td><td>{card.answer}</td><td>{card.updated}</td><td>{card.grade}</td>{buttons}
            </tr>
        )
    });

    useEffect(() => {
        if(cardsPack_id) {
            dispatch(getCards(cardsPack_id));
        }
    }, []);

    return (
        <div className={s.cardsWrapper}>
            <div className={s.container}>
                <div>
                   <AddCardModalContainer cardsPack_id={cardsPack_id? cardsPack_id : ''}/>
                </div>
                {/*<div>*/}
                {/*    <input*/}
                {/*        className={s.searchInput}*/}
                {/*        placeholder={'Search question...'}*/}
                {/*        value={question}*/}
                {/*        onChange={(e) => setQuestion(e.currentTarget.value)}*/}
                {/*    />*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <input*/}
                {/*        className={s.searchInput}*/}
                {/*        placeholder={'Search answer...'}*/}
                {/*        value={answer}*/}
                {/*        onChange={(e) => setAnswer(e.currentTarget.value)}*/}
                {/*    />*/}
                {/*</div>*/}
                <table className={s.table}>
                    <thead className={s.tableHead}>
                        <tr className={s.tableTitleRow}><th>Question</th><th>Answer</th><th>Last Updated</th><th>Grade</th><th></th></tr>
                    </thead>
                    <tbody>
                        {cardsBodyTable}
                    </tbody>
                </table>
                <div>
                    pagination
                </div>
            </div>
        </div>
    );
};