import axios, {AxiosResponse} from 'axios';
import {
    DataLoginType,
    DataType,
    ProfileResponseType,
    UpdateProfileResponseType
} from "../store/redusers/profile-reducer";

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});
// export const instance = axios.create({
//     baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
//     withCredentials: true,
// })

export const nekoCardsAPI = {
    requestNewPassword(email: string) {
        const data = {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
                      password recovery link: 
                        <a href='http://localhost:3000/#/set-new-password/$token$'>
                          link
                        </a>
                      </div>`,
        }
        return instance.post(`/auth/forgot`, data);
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return instance.post(`/auth/set-new-password`, {password, resetPasswordToken});
    },
    setProfile() {
        return instance.post<any, AxiosResponse<ProfileResponseType>>('/auth/me', {})
    },
    editProfile(dataProfile: DataType) {
        const {name, avatar} = dataProfile
        debugger
        return instance.put<any, AxiosResponse<UpdateProfileResponseType>, {name: string, avatar: string}>(`/auth/me`, {name, avatar})
    },
    login(dataLogin: DataLoginType) {

        return instance.post('/auth/login', {dataLogin})
    }


}