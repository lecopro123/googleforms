import * as types from '../types'

const initialState = {
    data: [],
    done: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.data_r:
            return {
                ...state,
                data: action.data,
                done: true
            }
        case types.data_l:
            return {
                ...state,
                data: action.data,
                done: false
            }
        default:
            return state
    }
}

export default reducer
