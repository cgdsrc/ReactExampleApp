export const data = {

    Modal: false,
    Title: '',
    Index: -1,
    _id: null,
    person_name: '',
    business_name: "",
    business_gts_number: null,
    Errors: ""
}

export const MongoModalReducer = (state = data, action) => {
    switch (action.type) {
        case 'TOGGLE_MONGO':
            return {
                ...state,
                Modal: !state.Modal
            }
        case 'MODAL_CHANGE_MONGO':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'UPDATE_ITEM_DATA_MONGO':
            return {
                ...state,
                _id: action.payload._id,
                person_name: action.payload.person_name,
                business_name: action.payload.business_name,
                business_gts_number: action.payload.business_gts_number,

            }
        case 'UPDATE_TITLE_MONGO':
            return {
                ...state,
                Title: action.payload
            }
        case 'UPDATE_INDEX_MONGO':
            return {
                ...state,
                Index: action.payload
            }
        // case 'ERRORMODAL':
        //     return {
        //         ...state,
        //         Errors: action.payload
        //     }
        default:
            return state;
    }
}