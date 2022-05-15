import {Modal} from "../../Modal";
import {useState} from "react";
import SuperButton from "../../../../CommonComponents/c2-SuperButton/SuperButton";
import {DeletePackTC} from "../../../../store/redusers/packsListPage-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store/store";


type DeleteModalContainerType = {
    id: string
}

export const DeleteModalContainer = (props: DeleteModalContainerType) => {
    const dispatch: AppDispatch = useDispatch()
    const [show, setShow] = useState<boolean>(false)


    const deletePack = (packId: string) => {
        dispatch(DeletePackTC(packId))
    }
    return (
        <div>
            <button onClick={() => setShow(true)}>del</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <h4>Do you really want to remove Pack Name - Name Pack?
                    All cards will be excluded from this course.</h4>
                <SuperButton onClick={() => setShow(false)}>
                    cancel
                </SuperButton>
                <SuperButton onClick={() => deletePack(props.id)}>
                    delete
                </SuperButton>

            </Modal>
        </div>
    )
}