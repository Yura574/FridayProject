import React, {useState} from 'react';
import s from './Pagination.module.css'

type PropsType = {
    totalElementsCount: number
    elementsOnPageCount: number
    currentPage: number
    buttonsQuantity: number
    changePage: (p: number) => void
}

export const Pagination = (props: PropsType) => {

    let pagesCount = Math.ceil(props.totalElementsCount / props.elementsOnPageCount)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / props.buttonsQuantity)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.buttonsQuantity + 1
    let rightPortionPageNumber = portionNumber * props.buttonsQuantity

    return (
        <div className={s.main}>
            {portionNumber > 1
                ? <div
                    className={s.element}
                    onClick={() => {
                        setPortionNumber(portionNumber - 1)
                        props.changePage(leftPortionPageNumber - 1)
                    }}
                >{`-10`}</div>
                : <div className={s.element}>-</div>
            }
            {props.currentPage > 1
                ? <div
                    className={s.element}
                    onClick={() => {
                        props.changePage(props.currentPage - 1)
                        props.currentPage === leftPortionPageNumber && setPortionNumber(portionNumber - 1)
                    }}
                >{`<`}</div>
                : <div className={s.element}>-</div>
            }


            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map(p => {
                    return <div key={p}
                                className={props.currentPage === p ? `${s.selected} ${s.element}` : s.element}
                                onClick={() => props.changePage(p)}
                    >{p}</div>
                })}
            {props.currentPage < pagesCount
                ? <div
                    className={s.element}
                    onClick={() => {
                        props.changePage(props.currentPage + 1)
                        props.currentPage === rightPortionPageNumber && setPortionNumber(portionNumber + 1)
                    }}
                >{`>`}</div>
                : <div className={s.element}>-</div>
            }
            {portionNumber < portionCount
                ? <div
                    className={s.element}
                    onClick={() => {
                        setPortionNumber(portionNumber + 1)
                        props.changePage(leftPortionPageNumber + props.buttonsQuantity)
                    }}
                >{`+10`}</div>
                : <div className={s.element}>-</div>
            }
        </div>
    );
};