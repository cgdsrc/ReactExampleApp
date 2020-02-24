export const data = {

    items: []

}


export const SocketReducer = (state = data, action) => {
    switch (action.type) {
        case 'SOCKET_DATA':
            return {
                ...state,
                items: action.payload

            }

        default:
            return state;
    }
}