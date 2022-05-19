import React, {useEffect, useState} from "react";
import SuperButton from "../../CommonComponents/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {getCardsData, CardType, updateGrade, clearCard} from "../../store/redusers/cards-reducer";
import s from "./Learn.module.css"
import {GetPacksListTC, PacksListPageType} from "../../store/redusers/packsListPage-reducer";
import {Loader} from "../../CommonComponents/c4-Loader/Loader";
import {RepeatPage} from "./repeatPage";

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    return cards[res.id + 1];
}

export const LearnPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [rating, setRating] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)
    const {cards} = useSelector((store: AppRootStateType) => store.cards);
    const packsList = useSelector<AppRootStateType, PacksListPageType>(state => state.packsList)
    const {cardsPack_id} = useParams();
    const initializedCardPack = useSelector<AppRootStateType, boolean>( state => state.app.setInitializedCardPack)

    const [card, setCard] = useState<CardType>({
        answer: 'answer fake',
        cardsPack_id: '',
        comments: '',
        created: '',
        grade: 0,
        more_id: '',
        question: 'question fake',
        rating: 0,
        shots: 0,
        type: '',
        updated: '',
        user_id: '',
        __v: 0,
        _id: 'fake',
    });


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
        if (first) {
            cardsPack_id && dispatch(getCardsData(cardsPack_id));
            setFirst(false);
        }
        if (cards.length > 0) {
            setCard(getCard(cards));
        }
    }, [dispatch, cardsPack_id, cards, first]);


    if(!initializedCardPack){
        return <Loader/>
    }
    const packName = packsList.packsList.cardPacks.filter(p => p._id === cardsPack_id)[0].name
    const onSelectRating = (i: number) => {
        setRating(i + 1)
    }

    if (!initializedCardPack && cards.length === 0) {
        return <RepeatPage />
        // alert('as')
    }
    const onNext = (card_id: string) => {
        dispatch(updateGrade(card_id, rating))
        dispatch(clearCard(card_id))

        if (rating < 1 || rating > 5) {
            setError(true)
        } else {
            setIsChecked(false)
            setRating(0)
            setError(false)

            if (cards.length > 0) {
                debugger
                // dispatch
                setCard(getCard(cards));
            } else {

            }
        }
    }
// if(card.cardsPack_id === ''){
//     return <Loader/>
// }
    return (
        <div className={s.main}>
            <div className={s.learnBlock}>
                <h3>Learn "{packName}"</h3>
                <div>Question: "{card.question}"</div>
                {!isChecked && (
                    <div>
                        <NavLink to={'/packslist'}>
                            <SuperButton>Cancel</SuperButton>
                        </NavLink>
                        <SuperButton onClick={() => setIsChecked(true)}>Show answer</SuperButton>
                    </div>
                )}
                {isChecked && (
                    <>
                        <div>Answer: "{card.answer}"</div>

                        Rate yourself:
                        <div>
                            {grades.map((g, i) => (
                                <div
                                    key={i}
                                    className={s.ul}
                                    onClick={() => onSelectRating(i)}
                                >
                                    <div className={rating !== i + 1 ? s.selector : s.activeSelector}></div>
                                    <div>{g}</div>
                                </div>
                            ))}
                        </div>


                        <div>
                            <NavLink to={'/packslist'}>
                                <SuperButton>Cancel</SuperButton>
                            </NavLink>
                            <SuperButton onClick={() => onNext(card._id)}>next</SuperButton>
                        </div>
                    </>
                )}
                {error && <div className={s.error}>Rate yourself before next question!</div>}
            </div>
        </div>
    );
}