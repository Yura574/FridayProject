import {packsListPageAPI} from "../../api/neko-cards-api";
import {Dispatch} from "redux";
import {setInitializedCardPack, SetInitializedCardPack, setIsLoader, SetIsLoadingType} from "./app-reducer";
import {setInitialized, SetInitializedType} from "./login-reducer";

enum CardsAction {
    SET_CARDS = 'Cards/SET_CARDS',
    SET_CURRENT_PAGE = 'Cards/SET_CURRENT_PAGE',
    CLEAR_CARD = 'Cards/CLEAR_CARD'
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
    token: string
    tokenDeathTime: number
}

const initialState: InitialState = {
    cards: [],
    cardsTotalCount: 1,
    maxGrade: 6,
    minGrade: 0,
    packUserId: "",
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0
}

type CardsActionTypes = SetCardsType | SetCardPageType | SetClearCard;

export const cardsReducer = (state: InitialState = initialState, action: CardsActionTypes) => {
    switch (action.type) {
        case CardsAction.SET_CARDS:
            // const {
            //     cards, cardsTotalCount, pageCount, page, packUserId,
            //     token, tokenDeathTime, maxGrade, minGrade
            // } = action.payload.data
            return {...action.payload.data}
        // return {...state, ...action.payload.data}
        case CardsAction.SET_CURRENT_PAGE: {
            return {...state, ...action.payload}
        }
        case CardsAction.CLEAR_CARD:
            return {
                ...state,
                cards: state.cards.filter(el => el._id !== action.card_id)
            }
        default:
            return state;
    }
}

type SetCardsType = ReturnType<typeof setCardsData>
export const setCardsData = (data: InitialState) => {
    return {
        type: CardsAction.SET_CARDS,
        payload: {
            data,
        }
    } as const
}

type SetCardPageType = ReturnType<typeof setCardPage>
export const setCardPage = (page: number) => {
    return {
        type: CardsAction.SET_CURRENT_PAGE,
        payload: {
            page,
        },
    } as const
}

type SetClearCard = ReturnType<typeof clearCard>
export const clearCard = (card_id: string) => {
    return {
        type: CardsAction.CLEAR_CARD,
        card_id
    } as const
}

export const getCardsData = (cardsPack_id: string, page?: number, pageCount?: number) => (dispatch: Dispatch<CardsActionTypes | SetIsLoadingType | SetInitializedCardPack>) => {
    debugger
    dispatch(setIsLoader(true));
    packsListPageAPI.getCardsData(cardsPack_id, page, pageCount)
        .then(({data}) => {
            dispatch(setCardsData(data))
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoader(false));
            dispatch(setInitializedCardPack(true))
        });
}

export const addCard = (cardsPack_id: string, question: string, answer: string) => (dispatch: Dispatch<CardsActionTypes | SetIsLoadingType>) => {
    dispatch(setIsLoader(true));
    packsListPageAPI.addCards(cardsPack_id, question, answer)
        .then((res) => {
            packsListPageAPI.getCardsData(cardsPack_id)
                .then(({data}) => {
                    dispatch(setCardsData(data))
                })
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        });
}

export const deleteCard = (id: string, cardsPack_id: string) => (dispatch: Dispatch<CardsActionTypes | SetIsLoadingType>) => {
    dispatch(setIsLoader(true));
    packsListPageAPI.deleteCard(id)
        .then((res) => {
            packsListPageAPI.getCardsData(cardsPack_id)
                .then(({data}) => {
                    dispatch(setCardsData(data))
                })
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        });
}

export const updateCard = (id: string, cardsPack_id: string, question: string, answer: string) => (dispatch: Dispatch<CardsActionTypes | SetIsLoadingType>) => {
    dispatch(setIsLoader(true));
    packsListPageAPI.updateCard(id, question, answer)
        .then((res) => {
            packsListPageAPI.getCardsData(cardsPack_id)
                .then(({data}) => {
                    dispatch(setCardsData(data))
                })
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsLoader(false));
        });
}
export const updateGrade = (card_id: string, grade: number) => (dispatch: Dispatch) => {
    dispatch(setIsLoader(true))
    // debugger
    packsListPageAPI.updateGrade(card_id, grade)
        .then(res => {
            // debugger
        })
}