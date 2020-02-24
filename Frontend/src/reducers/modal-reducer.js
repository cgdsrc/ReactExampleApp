export const data = {

    Modal: false,
    Title: '',
    Index: -1,
    VehicleId: null,
    VehicleName: '',
    VehicleDeviceId: null,
    VehicleLineId: null,
    VehicleDriverId: '',
    CoupledVehicleId: null,
    VehicleStatus: '',
    isDeleted: '',
    VehicleDesc: '',
    Drivers: [],
    Errors: ""
}

export const ModalReducer = (state = data, action) => {
    switch (action.type) {
        case 'TOGGLE':
            return {
                ...state,
                Modal: !state.Modal
            }
        case 'UPDATE_DRIVERS':
            return {
                ...state,
                Drivers: action.payload
            }
        case 'MODAL_CHANGE':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'UPDATE_ITEM_DATA':
            return {
                ...state,
                VehicleId: action.payload.VehicleId,
                VehicleName: action.payload.VehicleName,
                VehicleDeviceId: action.payload.VehicleDeviceId,
                VehicleLineId: action.payload.VehicleLineId,
                VehicleDriverId: action.payload.VehicleDriverId,
                CoupledVehicleId: action.payload.CoupledVehicleId,
                VehicleStatus: action.payload.VehicleStatus,
                isDeleted: action.payload.isDeleted,
                VehicleDesc: action.payload.VehicleDesc,
            }
        case 'UPDATE_TITLE':
            return {
                ...state,
                Title: action.payload
            }
        case 'UPDATE_INDEX':
            return {
                ...state,
                Index: action.payload
            }
        case 'ERRORMODAL':
            return {
                ...state,
                Errors: action.payload
            }
        default:
            return state;
    }
}