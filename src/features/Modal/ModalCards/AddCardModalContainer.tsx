import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {addCard} from "../../../store/redusers/cards-reducer";
import s from "../ModalStyles.module.css";
import SuperInput from "../../../CommonComponents/c1-SuperInput/SuperInput";


type AddCardModalContainerType = {
    cardsPack_id: string
}

export const AddCardModalContainer = (props: AddCardModalContainerType) => {
    const {cardsPack_id} = props
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const onClickAddCard = () => {
        if (cardsPack_id) {
            dispatch(addCard(cardsPack_id, question, answer));
        }
        setShow(false)
        setQuestion('')
        setAnswer('')
    }
    const cancel = () => {
        setShow(false)
        setQuestion('')
        setAnswer('')
    }

    return (
        <>
            <SuperButton onClick={() => setShow(true)}>add pack</SuperButton>
            <Modal activeModal={show} cancel={cancel}>
                <div className={s.title}>
                    <span>Add new card</span>
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
                    <SuperButton onClick={onClickAddCard} className={s.submitButton}> submit</SuperButton>
                </div>
            </Modal>
        </>
    )
}