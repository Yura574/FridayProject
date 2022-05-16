import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperInputText from "../../../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {addCard, deleteCard} from "../../../store/redusers/cards-reducer";
import s from "../ModalStyles.module.css";


type DeleteCardModalContainerType = {
    cardsPack_id: string
    card_id: string
    defaultQuestion: string
}

export const DeleteCardModalContainer = (props: DeleteCardModalContainerType) => {
    const {cardsPack_id, card_id, defaultQuestion} = props
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const onClickDeleteCard = () => {
        if (cardsPack_id) {
            dispatch(deleteCard(card_id, cardsPack_id));
        }
    }
    const cancel = () => {
        setShow(false)
    }

    return (
        <>
            <button onClick={() => setShow(true)}>delete card</button>
            <Modal activeModal={show} cancel={cancel}>
                <div className={s.title}>
                    <span>Delete pack</span>
                    <button onClick={cancel} className={s.iconButton}></button>
                </div>
                <div className={s.text}>
                    Do you really want to remove <b>{defaultQuestion}</b>?
                </div>
                <div className={s.buttonsModal}>
                    <SuperButton onClick={cancel} className={s.cancelButton}> cancel</SuperButton>
                    <SuperButton onClick={onClickDeleteCard} className={s.deleteButton}> submit</SuperButton>
                </div>
            </Modal>
        </>
    )
}