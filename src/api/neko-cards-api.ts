import axios, {AxiosResponse} from 'axios';
import {
    DataLoginType,
    DataType,
    ProfileResponseType,
    UpdateProfileResponseType
} from "../store/redusers/profile-reducer";
import {PacksListType} from "../store/redusers/packsListPage-reducer";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0',
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});


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
    AuthMe() {
        return instance.post<any, AxiosResponse<ProfileResponseType>>('/auth/me', {})
    },
    editProfile(dataProfile: DataType) {
        const {name, avatar} = dataProfile
        return instance.put<any, AxiosResponse<UpdateProfileResponseType>, {name: string, avatar: string}>(`/auth/me`, {name, avatar})
    },
    login(dataLogin: DataLoginType) {
        return instance.post('/auth/login', {...dataLogin})
    },
    logout() {
        return instance.delete('/auth/me')
    },
    registration(email: string, password: string) {
        return instance.post('/auth/register', {email, password})
    },
}

export const packsListPageAPI = {
    getPacksList(packName?: string) {
        return instance.get<PacksListType>('/cards/pack', {params: {packName}})
    }
}