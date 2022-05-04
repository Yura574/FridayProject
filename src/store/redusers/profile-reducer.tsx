import {Dispatch} from "redux";
import {nekoCardsAPI} from "../../api/neko-cards-api";


const initialState = {
    name: '',
    email: '',
    avatar: 'https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_uhq.jpg'
}

export const profileReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "SET_PROFILE":
            return {...state}
        case "EDIT_PROFILE":
            return {...state, name: action.name, email: action.email, avatar: action.avatar}


        default:
            return state
    }
}

// actions
export const setProfile = () => {
    return {
        type: "SET_PROFILE"
    } as const
}
export const editProfile = (name: string, email: string, avatar: string) => {
    return {
        type: "EDIT_PROFILE",
        name,
        email,
        avatar
    } as const
}


//thunks
export const setProfileTC = () => (dispatch: Dispatch) => {
    nekoCardsAPI.setProfile()
        .then(res => {
            if(res){
                debugger
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

export const editProfileTC = (data: DataType) => (dispatch: Dispatch) => {
    nekoCardsAPI.editProfile(data)
        .then(res => {
            dispatch(editProfile(data.name, data.mail, data.avatar))
        })
}
export const loginTC = (data: DataLoginType) => (dispatch: Dispatch) => {
    debugger
    nekoCardsAPI.login(data)
        .then(res => {
            if(res){
                debugger
            }
            debugger
        })
        // .catch ((e)=> { const error = e.response ? e.response.data.error : (e.message + ', more details in the console')});
        .catch(err => {
            alert(JSON.stringify(err))
        })
 }


//types
type InitialStateType = typeof initialState
type ActionType = SetProfileType | EditProfileType

type EditProfileType = ReturnType<typeof editProfile>
type SetProfileType = ReturnType<typeof setProfile>
export type DataType = {
    name: string,
    mail: string,
    avatar: string
}
export type DataLoginType = {
    email: string,
    password: string,
    rememberMe: boolean
}


