import {Modal} from "../Modal";
import React, {useState} from "react";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import {DeletePackTC} from "../../../store/redusers/packsListPage-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import s from "../ModalStyles.module.css";


type DeleteModalContainerType = {
    id: string
}

export const DeletePackModalContainer = (props: DeleteModalContainerType) => {
    const dispatch: AppDispatch = useDispatch()
    const [show, setShow] = useState<boolean>(false)


    const deletePack = (packId: string) => {
        dispatch(DeletePackTC(packId))
    }
    const cancel = () => {
        setShow(false)
    }
    return (
        <div>
            <button onClick={() => setShow(true)}>del</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <div className={s.title}>
                    <span>Delete pack</span>
                    <button onClick={cancel} className={s.iconButton}></button>
                </div>
                <div className={s.text}>
                    Do you really want to remove Pack Name - Name Pack?
                    All cards will be excluded from this course.</div>
                <div className={s.buttonsModal}>
                    <SuperButton onClick={cancel} className={s.cancelButton}> cancel</SuperButton>
                    <SuperButton onClick={() => deletePack(props.id)} className={s.deleteButton}> submit</SuperButton>
                </div>

            </Modal>
        </div>
    )
}