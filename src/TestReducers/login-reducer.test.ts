import {loginReducer, setInitialized, setIsAuth} from "../store/redusers/login-reducer";


type InitialStateType = {
    isAuth: boolean,
    initialized: boolean
}
let initialState: InitialStateType

beforeEach(() => {
    initialState= {
        isAuth: false,
        initialized: false
    }
})

test('is initialized should be true', () => {
    const result = loginReducer(initialState, setInitialized(true))

    expect(result.initialized).toBe(true)
})
test(' isAuth should be true', () => {
    const result = loginReducer(initialState, setIsAuth(true))

    expect(result.isAuth).toBe(true)
})