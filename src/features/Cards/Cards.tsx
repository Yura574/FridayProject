import React, {useState} from 'react';
import s from './Cards.module.css';
import {useParams} from "react-router-dom";

export const Cards = () => {
    const {cardsPack_id} = useParams();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');


    return (
        <div className={s.cardsWrapper}>
            <div className={s.container}>
                <div>
                    <input
                        className={s.searchInput}
                        placeholder={'Search question...'}
                        value={question}
                        onChange={(e) => setQuestion(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <input
                        className={s.searchInput}
                        placeholder={'Search answer...'}
                        value={answer}
                        onChange={(e) => setAnswer(e.currentTarget.value)}
                    />
                </div>
                <table className={s.table}>
                    <thead className={s.tableHead}>
                        <tr className={s.tableTitleRow}><th>Question</th><th>Answer</th><th>Last Updated</th><th>Grade</th></tr>
                    </thead>
                    <tbody>
                        <tr className={s.tableRow}><td>данные1</td><td>данные2</td><td>данные3</td><td>данные4</td></tr>
                        <tr className={s.tableRow}><td>данные1</td><td>данные2</td><td>данные3</td><td>данные4</td></tr>
                        <tr className={s.tableRow}><td>данные1</td><td>данные2</td><td>данные3</td><td>данные4</td></tr>
                        <tr className={s.tableRow}><td>данные1</td><td>данные2</td><td>данные3</td><td>данные4</td></tr>
                        <tr className={s.tableRow}><td>данные1</td><td>данные2</td><td>данные3</td><td>данные4</td></tr>
                    </tbody>
                </table>
                <div>
                    pagination
                </div>
            </div>
        </div>
    );
};