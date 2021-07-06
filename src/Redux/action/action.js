import * as types from '../types';
let data = require('./data.json');
//console.log(data)

export const getForm = (cb) => (
    dispatch
) => {
    //console.log(user_id)
    dispatch({
        type: types.data_r,
        data: data
    })
    cb()

}