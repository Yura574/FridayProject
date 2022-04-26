import SuperInputText from "../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../CommonComponents/c2-SuperButton/SuperButton";
import SuperCheckbox from "../CommonComponents/c3-SuperCheckbox/SuperCheckbox";
import {useState} from "react";


export const TestPage = () => {
    const [value, setValue] = useState<string>('')
    const [checked, setChecked] = useState<boolean>(true);

    return (
        <div>
            <div><SuperInputText onChangeText={setValue} value={value}/></div>
            <div><SuperButton>button</SuperButton></div>
            <SuperCheckbox checked={checked} onChangeChecked={setChecked} />
        </div>
    )
}