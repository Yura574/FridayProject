import {Modal} from "../../Modal";
import {useState} from "react";
import SuperInputText from "../../../../CommonComponents/c1-SuperInputText/SuperInputText";
import {UpdatePackTC} from "../../../../store/redusers/packsListPage-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store/store";
import SuperButton from "../../../../CommonComponents/c2-SuperButton/SuperButton";


type EditModalContainerType = {
    name: string
    packId: string
}

export const EditModalContainer = (props: EditModalContainerType) => {
    const dispatch:AppDispatch = useDispatch()
    const [show, setShow] = useState<boolean>(false)

    const [editName, setEditName] = useState<string>(props.name)

    const editPack = (packId: string, name: string) => {
        dispatch(UpdatePackTC(packId, name))
        setShow(false)
    }
    return (
        <div>
            <button onClick={()=> setShow(true)}>edit</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <SuperInputText onChangeText={setEditName} value={editName}/>
                <SuperButton onClick={() =>editPack(props.packId, editName)}>
                    submit
                </SuperButton>
            </Modal>
        </div>
    )
}