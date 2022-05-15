import s from './Modal.module.css'
import React from "react";

type modalType = {
    activeModal: boolean
    setActiveModal: (active: boolean) => void
    children: React.ReactNode
}

export const    Modal = (props: modalType) => {
    return (
        <div className={props.activeModal? `${s.model_wrapper} ${s.active}`:`${s.model_wrapper}`} onClick={() =>props.setActiveModal(false)}>
            <div className={props.activeModal? `${s.model_content} ${s.active}`:`${s.model_content}`} onClick={(e) => e.stopPropagation()}>
                <div style={{marginTop:'20px', display:'flex', justifyContent:'center'}}>{props.children}</div>
            </div>
        </div>
    )
}