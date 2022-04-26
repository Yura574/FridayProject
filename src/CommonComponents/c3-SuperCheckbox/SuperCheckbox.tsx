import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from "./SuperCheckbox.module.css";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (isDone: boolean) => void
    spanClassName?: string
    testOnChange?: (isDone: boolean) => void
    checked: boolean
};

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        className, spanClassName,
        children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
        testOnChange,
        checked,
        disabled,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if(onChangeChecked){
            onChangeChecked(e.currentTarget.checked)
        }
    }
    const finalInputClassName = `${s.checkbox} ${className ? className : ""}`;
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`

    return (
        <div>
            <label className={s.form_control}>
                <input type="checkbox"
                       name="checkbox-checked"
                       checked={checked}
                       className={finalInputClassName}
                       disabled={disabled && disabled}
                       onChange={onChangeCallback}
                       {...restProps}
                />
                {children && <span className={finalSpanClassName}>{children}</span>}
            </label>
        </div>




        // <label>
        //     <input
        //         type={"checkbox"}
        //         onChange={onChangeCallback}
        //         className={finalInputClassName}
        //         {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
        //     />
        //     {children && <span className={s.spanClassName}>{children}</span>}
        // </label> // благодаря label нажатие на спан передастся в инпут
        // <>
        //     <svg xmlns="http://www.w3.org/2000/svg" style={{display: 'none'}}>
        //         <symbol id="checkmark" viewBox="0 0 24 24">
        //             <path strokeLinecap="round" strokeMiterlimit="10" fill="none" d="M22.9 3.7l-15.2 16.6-6.6-7.1">
        //             </path>
        //         </symbol>
        //     </svg>
        //
        //
        //
        //         <div className={s.promoted_checkbox}>
        //             <input
        //                 id="tmp"
        //                 type="checkbox"
        //                 className={finalInputClassName}
        //                 onChange={onChangeCallback}
        //                 {...restProps}
        //             />
        //             <label htmlFor="tmp">
        //                 <svg>
        //                     <use xlinkHref="#checkmark"/>
        //                 </svg>
        //             </label>
        //
        //         </div>
        //
        //
        //
        // </>

    );
}

export default SuperCheckbox;
