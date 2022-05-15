import React, {useState} from "react";
import {AddPackTC} from "../../../../store/redusers/packsListPage-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../store/store";
import {Modal} from "../../Modal";
import SuperInputText from "../../../../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../CommonComponents/c2-SuperButton/SuperButton";


export const AddModalContainer = () => {
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const [titlePack, setTitlePack] = useState<string>('')

    const addPack = () => {
        dispatch(AddPackTC({name: titlePack, private: false, deckCover: ''}))
        setTitlePack('')
        setShow(false)
    }
    return (
        <>
            <button onClick={() => setShow(true)}>add pack</button>
            <Modal activeModal={show} setActiveModal={setShow}>
                <SuperInputText onChangeText={setTitlePack} value={titlePack}/>
                <div><SuperButton onClick={addPack}> submit</SuperButton></div>
            </Modal>
        </>
    )
}