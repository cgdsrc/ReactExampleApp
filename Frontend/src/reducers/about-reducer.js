export const data = {

    Items: []

}


export const AboutReducer = (state = data, action) => {
    switch (action.type) {
        case 'ADD_ITEM_MONGO':
            return {
                ...state,
                Items: [
                    ...state.Items.slice(0, state.Items.length),
                    action.payload
                ]
            }
        case 'UPDATE_ITEM_MONGO':
            const itemIndex = state.Items.findIndex(data => data._id === action.payload._id);
            const newArray = [
                ...state.Items.slice(0, itemIndex),
                action.payload,
                ...state.Items.slice(itemIndex + 1)
            ]
            return {
                ...state,
                Items: newArray
            }
        case 'DELETE_ITEM_MONGO ':
            const updateItem = state.Items.filter(Item => Item._id !== action.payload)
            return {
                ...state,
                Items: updateItem
            }
        case 'UPDATE_ITEMS_MONGO':
            return {
                ...state,
                Items: action.payload
            }

        default:
            return state;
    }
}