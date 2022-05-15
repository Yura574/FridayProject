import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperInputText from "../../../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {addCard, updateCard} from "../../../store/redusers/cards-reducer";
import s from "../ModalStyles.module.css";
import SuperInput from "../../../CommonComponents/c1-SuperInput/SuperInput";


type UpdateCardModalContainer = {
    cardsPack_id: string
    card_id: string

}

export const UpdateCardModalContainer = (props: UpdateCardModalContainer) => {
    const {cardsPack_id, card_id} = props
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const onClickUpdateCard = () => {
        if (cardsPack_id) {
            dispatch(updateCard(card_id, cardsPack_id, question, answer));
        }
    }
    const cancel = () => {
        setShow(false)
    }


    return (
        <>
            <button onClick={() => setShow(true)}>edit</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <div className={s.title}>
                    <span>Edit card</span>
                    <button onClick={cancel} className={s.iconButton}></button>
                </div>
                <div className={s.element}>
                    <SuperInput
                        onChangeText={setQuestion}
                        value={question}
                        placeholder={'question'}
                        label={'question'}/>
                    <SuperInput
                        onChangeText={setAnswer}
                        value={answer}
                        placeholder={'answer'}
                        label={'answer'}/>
                </div>
                <div className={s.buttonsModal}>
                    <SuperButton onClick={cancel} className={s.cancelButton}> cancel</SuperButton>
                    <SuperButton onClick={onClickUpdateCard}
                                 className={s.submitButton}> submit</SuperButton>
                </div>
            </Modal>
        </>
    )
}