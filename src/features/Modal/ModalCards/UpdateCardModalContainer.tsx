import {useDispatch} from "react-redux";
import {useState} from "react";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperInputText from "../../../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {addCard, updateCard} from "../../../store/redusers/cards-reducer";


type UpdateCardModalContainer = {
    cardsPack_id: string
    card_id: string

}

export const UpdateCardModalContainer = (props: UpdateCardModalContainer) => {
    const{ cardsPack_id, card_id} = props
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const onClickUpdateCard = () => {
        if(cardsPack_id) {
            dispatch(updateCard(card_id, cardsPack_id, question, answer));
        }
    }


    return (
        <>
            <button onClick={() => setShow(true)}>edit</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <SuperInputText onChangeText={setQuestion} value={question}/>
                <SuperInputText onChangeText={setAnswer} value={answer}/>
                <div><SuperButton onClick={onClickUpdateCard}> submit</SuperButton></div>
            </Modal>
        </>
    )
}