import axios from 'axios';
import {DataLoginType, DataType} from "../store/redusers/profile-reducer";

// const instance = axios.create({
//     baseURL: 'http://localhost:7542/2.0',
//     // baseURL: 'https://neko-back.herokuapp.com/2.0',
//     withCredentials: true,
// });
export const instance = axios.create({
        baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

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
        return instance.post('/auth/me', {})
    },
    editProfile(dataProfile: DataType) {
        return instance.put(`/auth/me`, {dataProfile})
    },
    login(dataLogin: DataLoginType) {
        debugger
        return instance.post('/auth/login', {dataLogin})
    }


}