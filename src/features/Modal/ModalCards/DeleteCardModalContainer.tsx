import {useDispatch} from "react-redux";
import {useState} from "react";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperInputText from "../../../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {addCard, deleteCard} from "../../../store/redusers/cards-reducer";


type DeleteCardModalContainerType = {
    cardsPack_id: string
    card_id: string
}

export const DeleteCardModalContainer = (props: DeleteCardModalContainerType) => {
    const{ cardsPack_id, card_id} = props
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const onClickDeleteCard = () => {
        if(cardsPack_id) {
            dispatch(deleteCard(card_id, cardsPack_id));
        }
    }

    return (
        <>
            <button onClick={() => setShow(true)}>delete card</button>
            <Modal activeModal={show} setActiveModal={setShow}>

                <div><SuperButton onClick={()=> setShow(false)}> cancel</SuperButton></div>
                <div><SuperButton onClick={onClickDeleteCard}> submit</SuperButton></div>
            </Modal>
        </>
    )
}