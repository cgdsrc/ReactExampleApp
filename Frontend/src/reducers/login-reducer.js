const checkIsAuth = () => {
    const token = localStorage.getItem("token");
    return token && token.length > 0 ? true : false
}

export const initialState = {

    sessionId: "",
    Errors: {},
    isAuth: checkIsAuth(),
    IsLoading: false

}

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUBMIT':
            return {
                ...state,
                Errors: action.payload.Errors,
                isAuth: action.payload.isAuth
            };
        case 'SET_ISAUTH':
            return {
                ...state,
                isAuth: action.payload.isAuth
            }
        case 'SET_ISLOADING':
            return {
                ...state,
                IsLoading: action.payload
            }
        default:
            return state;
    }
}