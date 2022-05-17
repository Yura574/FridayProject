import React, {useEffect, useState} from 'react';
import s from './Cards.module.css';
import {NavLink, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {CardType, getCardsData, setCardPage} from "../../store/redusers/cards-reducer";
import {AddCardModalContainer} from "../Modal/ModalCards/AddCardModalContainer";
import {DeleteCardModalContainer} from "../Modal/ModalCards/DeleteCardModalContainer";
import {UpdateCardModalContainer} from "../Modal/ModalCards/UpdateCardModalContainer";
import SuperButton from "../../CommonComponents/c2-SuperButton/SuperButton";
import {Pagination} from "../../CommonComponents/c5-Pagination/Pagination";

export const Cards = () => {
    const {cardsPack_id} = useParams();
    // const [question, setQuestion] = useState('');
    // const [answer, setAnswer] = useState('');

    const dispatch = useDispatch<AppDispatch>();

    const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount);
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.pageCount);
    const page = useSelector<AppRootStateType, number>(state => state.cards.page);

    const cards = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards);

    const userId = useSelector<AppRootStateType, string>(state => state.profile.profile._id);

    const packUserId = useSelector<AppRootStateType, string>(state => state.cards.packUserId);


    const cardsBodyTable = cards.map(card => {

        const cardDate = new Date(card.updated).toLocaleString();

        const buttons = <td>
            {userId === packUserId &&
                <>
                    <UpdateCardModalContainer cardsPack_id={card.cardsPack_id}
                                              card_id={card._id}
                                              defaultQuestion={card.question}
                                              defaultAnswer={card.answer}
                    />
                    <DeleteCardModalContainer cardsPack_id={card.cardsPack_id}
                                              card_id={card._id}
                                              defaultQuestion={card.question}
                    />
                </>
            }
        </td>

        return (
            <tr key={card._id} className={s.tableRow}>
                <td>{card.question}</td><td>{card.answer}</td><td>{cardDate}</td><td>{card.grade}</td>{buttons}
            </tr>
        )
    });

    useEffect(() => {
        if(cardsPack_id) {
            dispatch(getCardsData(cardsPack_id, page, pageCount));
        }
    }, [page]);

    const changePage = (page: number) => {
        dispatch(setCardPage(page))
    }

    return (
        <div className={s.cardsWrapper}>
            <div className={s.container}>
                <NavLink to={'/packslist'}>
                    <SuperButton>
                        Back to Pack List
                    </SuperButton>
                </NavLink>
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
                        <tr className={s.tableTitleRow}><th>Question</th><th>Answer</th><th>Last Updated</th><th>Grade</th><th>{userId === packUserId &&
                            <AddCardModalContainer cardsPack_id={cardsPack_id? cardsPack_id : ''}/>
                        }</th></tr>
                    </thead>
                    <tbody>
                        {cardsBodyTable}
                    </tbody>
                </table>
                <Pagination
                    totalElementsCount={cardsTotalCount}
                    elementsOnPageCount={pageCount}
                    currentPage={page}
                    buttonsQuantity={10}
                    changePage={changePage}
                />
            </div>
        </div>
    );
};