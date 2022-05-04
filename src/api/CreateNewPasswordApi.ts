import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const API = {
    register(email: string, password: string) {
        return instance.post('/auth/register', {email, password})
    }
}

export type RegisterErrorType = {
    emailRegExp: {}
    error: string
    in: string
    isEmailValid: true
    isPassValid: false
    passwordRegExp: string
}