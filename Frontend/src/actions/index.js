export const onSubmitLogin = (Data) => {
    return {
        type: 'LOGIN_SUBMIT',
        payload: Data
    }
}

export const setIsAuth = (Data) => {
    return {
        type: 'SET_ISAUTH',
        payload: Data
    }
}

export const setIsLoading = (Data) => {
    return {
        type: 'SET_ISLOADING',
        payload: Data
    }
}
//-----------------------------------------------MySQL--------------------------
export const Toggle = () => {
    return {
        type: 'TOGGLE'
    }
}



export const addItem = (Data) => {
    return {
        type: 'ADD_ITEM',
        payload: Data
    }
}

export const updateTitle = (Data) => {
    return {
        type: 'UPDATE_TITLE',
        payload: Data
    }
}

export const updateIndex = (Data) => {
    return {
        type: 'UPDATE_INDEX',
        payload: Data
    }
}

export const updateItem = (Data) => {
    return {
        type: 'UPDATE_ITEM',
        payload: Data
    }
}

export const updateItems = (Data) => {
    return {
        type: 'UPDATE_ITEMS',
        payload: Data
    }
}

export const deleteItem = (Data) => {
    return {
        type: 'DELETE_ITEM',
        payload: Data
    }
}

export const updateDrivers = (Data) => {
    return {
        type: 'UPDATE_DRIVERS',
        payload: Data
    }
}

export const On_ChangeModal = (Data) => {
    return {
        type: 'MODAL_CHANGE',
        payload: Data
    }
}

export const updateItemData = (Data) => {
    return {
        type: 'UPDATE_ITEM_DATA',
        payload: Data
    }
}
//---------------------------Mongo actions-----------------------------------
export const updateItemMongo = (Data) => {
    return {
        type: 'UPDATE_ITEM_MONGO',
        payload: Data
    }
}
export const updateItemsMongo = (Data) => {
    return {
        type: 'UPDATE_ITEMS_MONGO',
        payload: Data
    }
}
export const deleteItemMongo = (Data) => {
    return {
        type: 'DELETE_ITEM_MONGO',
        payload: Data
    }
}
export const addItemMongo = (Data) => {
    return {
        type: 'ADD_ITEM_MONGO',
        payload: Data
    }
}
export const On_ChangeModalMongo = (Data) => {
    return {
        type: 'MODAL_CHANGE_MONGO',
        payload: Data
    }
}
export const updateIndexMongo = (Data) => {
    return {
        type: 'UPDATE_INDEX_MONGO',
        payload: Data
    }
}
export const ToggleMongo = () => {
    return {
        type: 'TOGGLE_MONGO'
    }
}
export const updateItemDataMongo = (Data) => {
    return {
        type: 'UPDATE_ITEM_DATA_MONGO',
        payload: Data
    }
}
export const updateTitleMongo = (Data) => {
    return {
        type: 'UPDATE_TITLE_MONGO',
        payload: Data
    }
}
