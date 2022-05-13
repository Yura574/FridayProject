import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {PacksListType, SearchByCardsCountAC} from "../../store/redusers/packsListPage-reducer";

export const CardsCountSlider = () => {
    const packsList = useSelector<AppRootStateType, PacksListType>(state => state.packsList.packsList)
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState<[number, number]>([packsList.minCardsCount, packsList.maxCardsCount])

    const onClickHandler = () => {
        dispatch(SearchByCardsCountAC(inputValue[0], inputValue[1]))
    }

    return (
        <span>
            <span>{packsList.minCardsCount}</span>
            <input
                type={"number"}
                value={inputValue[0]}
                onChange={(e) => setInputValue([+e.currentTarget.value, inputValue[1]])}
            />
            <input
                type={"number"}
                value={inputValue[1]}
                onChange={(e) => setInputValue([inputValue[0], +e.currentTarget.value])}
            />
            <span>{packsList.maxCardsCount}</span>
            <button onClick={onClickHandler}>Filter</button>
        </span>
    );
}