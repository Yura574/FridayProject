import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {SearchByCardsCountAC} from "../../store/redusers/packsListPage-reducer";
import {Range} from "rc-slider";
import 'rc-slider/assets/index.css';
import s from './PacksListPage.module.css'

export const CardsCountSlider = () => {
    const minCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.packsList.minCardsCount)
    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.packsList.maxCardsCount)
    const searchMinCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.searchMinCardsCount)
    const searchMaxCardsCount = useSelector<AppRootStateType, number>(state => state.packsList.searchMaxCardsCount)
    const dispatch = useDispatch()

    const [start, setStart] = useState<number>(minCardsCount)
    const [end, setEnd] = useState<number>(maxCardsCount)

    useEffect(() => {
        if (searchMinCardsCount > minCardsCount) {
            setStart(searchMinCardsCount)
        } else {
            setStart(minCardsCount)
        }
        if (searchMaxCardsCount < maxCardsCount && searchMaxCardsCount > 0) {
            setEnd(searchMaxCardsCount)
        } else {
            setEnd(maxCardsCount)
        }
    }, [minCardsCount, maxCardsCount])

    const rangeHandler = (value: number[]) => {
        setStart(value[0])
        setEnd(value[1])
    }
    const afterChangeRangeHandler = () => {
        dispatch(SearchByCardsCountAC(start, end))
    }

    return (
        <div className={s.slider}>
            <div>{start}</div>
            <Range
                style={{margin: '0 10px 0 10px'}}
                min={minCardsCount}
                max={maxCardsCount}
                //defaultValue={[minCardsCount, maxCardsCount]}
                value={[start, end]}
                allowCross={false}
                onChange={(value: number[]) => rangeHandler(value)}
                onAfterChange={afterChangeRangeHandler}
            />
            <div>{end}</div>
        </div>
    );
}