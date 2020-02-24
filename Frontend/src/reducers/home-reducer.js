export const data = {

    Items: []

}

export const HomeReducer = (state = data, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                Items: [
                    ...state.Items.slice(0, state.Items.length),
                    action.payload
                ]
            }
        case 'UPDATE_ITEM':
            const itemIndex = state.Items.findIndex(data => data.VehicleId === action.payload.VehicleId);
            const newArray = [
                ...state.Items.slice(0, itemIndex),
                action.payload,
                ...state.Items.slice(itemIndex + 1)
            ]
            return {
                ...state,
                Items: newArray
            }
        case 'DELETE_ITEM':
            const updateItem = state.Items.filter(Item => Item.VehicleId !== action.payload)
            return {
                ...state,
                Items: updateItem
            }
        case 'UPDATE_ITEMS':
            return {
                ...state,
                Items: action.payload
            }

        default:
            return state;
    }
}