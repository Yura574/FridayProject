import {useDispatch} from "react-redux";
import {useState} from "react";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperInputText from "../../../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {addCard} from "../../../store/redusers/cards-reducer";


type AddCardModalContainerType = {
    cardsPack_id: string
}

export const AddCardModalContainer = (props: AddCardModalContainerType) => {
    const{ cardsPack_id} = props
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const onClickAddCard = () => {
        if(cardsPack_id) {
            dispatch(addCard(cardsPack_id, question, answer));
        }
        setShow(false)
        setQuestion('')
        setAnswer('')
    }

    return (
        <>
            <button onClick={() => setShow(true)}>add pack</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <SuperInputText onChangeText={setQuestion} value={question}/>
                <SuperInputText onChangeText={setAnswer} value={answer}/>
                <div><SuperButton onClick={onClickAddCard}> submit</SuperButton></div>
            </Modal>
        </>
    )
}