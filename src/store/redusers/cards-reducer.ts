import {packsListPageAPI} from "../../api/neko-cards-api";
import {Dispatch} from "redux";
import {setIsLoader, SetIsLoadingType} from "./app-reducer";

enum CardsAction {
    GET_CARDS = 'Cards/GET_CARDS',
}

export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

type InitialState = {
    cards: CardType[]
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    packUserId: string
    page: number
    pageCount: number
}

const initialState: InitialState = {
    cards: [],
    cardsTotalCount: 1,
    minGrade: 0,
    maxGrade: 6,
    packUserId: "",
    page: 1,
    pageCount: 1,
}

type CardsActionTypes = GetCardsType;

export const cardsReducer = (state: InitialState = initialState, action: CardsActionTypes) => {
    switch (action.type) {
        case CardsAction.GET_CARDS:
            return {...state, ...action.payload}
        default:
            return state;
    }
}

type GetCardsType = ReturnType<typeof getCards>
export const getCards = (cards: CardType[]) => {
    return {
        type: CardsAction.GET_CARDS,
        payload: {
            cards
        }
    } as const
}

export const fetchCards = (cardsPack_id: string) => (dispatch: Dispatch<CardsActionTypes | SetIsLoadingType>) => {
    dispatch(setIsLoader(true));
    packsListPageAPI.getCards(cardsPack_id)
        .then(({data}) => {

            console.log(data)
            dispatch(getCards(data.cards))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        })
}