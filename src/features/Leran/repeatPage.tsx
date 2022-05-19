import React, {useEffect, useState} from "react";
import SuperButton from "../../CommonComponents/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../store/store";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {getCardsData, CardType, updateGrade, clearCard} from "../../store/redusers/cards-reducer";
import s from "./Learn.module.css"
import {GetPacksListTC, PacksListPageType} from "../../store/redusers/packsListPage-reducer";
import {Loader} from "../../CommonComponents/c4-Loader/Loader";



export const RepeatPage = () => {



    return (
        <div className={s.main}>
            <div className={s.learnBlock}>
                <h3>Cards over</h3>





                        <div>
                            <NavLink to={'/packslist'}>
                                <SuperButton>Back to packs</SuperButton>
                            </NavLink>

                        </div>

            </div>
            </div>

    );
}