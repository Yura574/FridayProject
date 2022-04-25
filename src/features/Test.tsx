import SuperInputText from "../CommonComponents/c1-SuperInputText/SuperInputText";
import SuperButton from "../CommonComponents/c2-SuperButton/SuperButton";
import SuperCheckbox from "../CommonComponents/c3-SuperCheckbox/SuperCheckbox";


export const TestPage = () => {
    return (
        <div>
            <div><SuperInputText onChangeText={() => {}} value={''}/></div>
            <div><SuperButton>button</SuperButton></div>
            <SuperCheckbox/>
        </div>
    )
}