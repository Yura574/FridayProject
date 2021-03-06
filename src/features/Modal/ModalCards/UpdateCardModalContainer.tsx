import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {updateCard} from "../../../store/redusers/cards-reducer";
import s from "../ModalStyles.module.css";
import SuperInput from "../../../CommonComponents/c1-SuperInput/SuperInput";


type UpdateCardModalContainer = {
    cardsPack_id: string
    card_id: string
    defaultQuestion: string
    defaultAnswer: string


}

export const UpdateCardModalContainer = (props: UpdateCardModalContainer) => {
    const {cardsPack_id, card_id, defaultQuestion, defaultAnswer} = props
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>(defaultQuestion)
    const [answer, setAnswer] = useState<string>(defaultAnswer)

    const onClickUpdateCard = () => {
        if (cardsPack_id) {
            dispatch(updateCard(card_id, cardsPack_id, question, answer));
        }
    }
    const cancel = () => {
        setShow(false)
        setAnswer(defaultAnswer)
        setQuestion(defaultQuestion)
    }


    return (
        <>
            <SuperButton onClick={() => setShow(true)}>edit</SuperButton>
            <Modal activeModal={show} cancel={cancel}>
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
                        label={'answer'}
                      />
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