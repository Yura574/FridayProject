import axios, {AxiosResponse} from 'axios';
import {
    DataLoginType,
    DataType,
    ProfileType,
    UpdateProfileResponseType
} from "../store/redusers/profile-reducer";
import {NewPackType, PacksListType, PackType} from "../store/redusers/packsListPage-reducer";

const instance = axios.create({
    // baseURL: 'http://localhost:7542/2.0',
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
});


export const nekoCardsAPI = {
    requestNewPassword(email: string) {
        const data = {
            email,
            from: 'test-front-admin <ai73a@yandex.by>',
            message: `<div style="background-color: lime; padding: 15px">
                      password recovery link: 
                        <a href='https://yura574.github.io/#/set-new-password/$token$'>
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
        return instance.post<ProfileType, AxiosResponse<ProfileType>>('/auth/me', {})
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
    getPacksList(packName?: string, min?: number, max?: number, sortPacks?: string, page?: number, pageCount?: number, user_id?: string) {
        const config = {
            params: {
                packName,
                min,
                max,
                sortPacks,
                page,
                pageCount,
                user_id,
            }
        }
        return instance.get<PacksListType>('/cards/pack', config)
    },
    addNewPack(cardsPack: NewPackType) {
        return instance.post('/cards/pack', {cardsPack})
    },
    deletePack(packId: string) {
        return instance.delete(`/cards/pack/?id=${packId}`)
    },
    updatePack(cardsPack: PackType){
       return  instance.put('/cards/pack', {cardsPack})
    },
    getCards(cardsPack_id: string) {
        return instance.get('/cards/card', {params: {cardsPack_id}});
    },
    addCards(cardsPack_id: string) {
        const card = {
            cardsPack_id,
        }

        return instance.post('cards/card', {card});
    },
    deleteCard(id: string) {
        return instance.delete('/cards/card?', {params: {id}});
    },
    updateCard(_id: string) {
        const card = {
            _id,
            question: 'new question',
            answer: 'new answer',
        }

        return instance.put('/cards/card', {card})
    }
}