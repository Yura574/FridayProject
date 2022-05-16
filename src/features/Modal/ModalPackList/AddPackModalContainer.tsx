import React, {useEffect, useRef, useState} from "react";
import {AddPackTC} from "../../../store/redusers/packsListPage-reducer";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store";
import {Modal} from "../Modal";
import SuperButton from "../../../CommonComponents/c2-SuperButton/SuperButton";
import s from "../ModalStyles.module.css";
import SuperInput from "../../../CommonComponents/c1-SuperInput/SuperInput";


export const AddPackModalContainer = () => {
    const dispatch: AppDispatch = useDispatch()

    const [show, setShow] = useState<boolean>(false)

    const [titlePack, setTitlePack] = useState<string>('')

    const addPack = () => {
        dispatch(AddPackTC({name: titlePack, private: false, deckCover: ''}))
        setTitlePack('')
        setShow(false)
    }
    const cancel = () => {
        setShow(false)
        setTitlePack('')
    }
    const emailInputRef = useRef<any>();

    useEffect(() => {
        emailInputRef.current?.focus();
    });
    return (
        <>
            <button onClick={() => setShow(true)}>add pack</button>
            <Modal activeModal={show} cancel={cancel}>
                <div className={s.wrapper}>
                    <div className={s.title}>
                        <span>Add new pack</span>
                        <button onClick={cancel} className={s.iconButton}></button>
                    </div>
                    <div className={s.element}>
                        <SuperInput
                            onChangeText={setTitlePack}
                            value={titlePack}
                            placeholder={'title'}
                            label={'title'}/>
                        {/*<TestInput ref={emailInputRef}/>*/}
                    </div>
                    <div className={s.buttonsModal}>
                        <SuperButton onClick={cancel} className={s.cancelButton}> cancel</SuperButton>
                        <SuperButton onClick={addPack} className={s.submitButton}> submit</SuperButton>
                    </div>
                </div>
            </Modal>
        </>
    )
}