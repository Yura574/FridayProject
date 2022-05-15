import React from "react";
import {Modal} from "../../Modal";
import SuperInputText from "../../../../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../CommonComponents/c2-SuperButton/SuperButton";


export type AddModalType = {
    show: boolean
    setShow: (isActive: boolean) => void
    namePack: string
    setNamePack: (name: string) => void
    addPack: () => void
}

export const AddModal =(props: AddModalType) => {


    return <div >
        <Modal activeModal={props.show} setActiveModal={props.setShow} >
            <SuperInputText onChangeText={props.setNamePack} value={props.namePack}/>
            <div><SuperButton onClick={props.addPack}> submit</SuperButton></div>
        </Modal>
    </div>
}