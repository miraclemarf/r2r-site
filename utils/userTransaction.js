import fetch from 'isomorphic-unfetch';
import { actionTypes } from '../components/types'

export const selectedPrice  = (obj)  => async (dispatch) => {
    return dispatch({ type: actionTypes.TRANSACTION_DATA, payload: obj })
}

export const selectedMotor = (obj) => async (dispatch) =>{
    return dispatch({ type: actionTypes.TRANSACTION_DATA, payload: obj })
}

export const selectedAccessories = (obj) => async (dispatch) =>{
    return dispatch({ type: actionTypes.TRANSACTION_DATA, payload: obj })
}

export const getDetailUserTransaction= async (accessToken, id) =>{
    console.log(id);
    
    const response = await fetch(process.env.API_URL+'/transaction/detail/'+id, {
        headers: {
            Authorization: 'Bearer '+accessToken
        }
    })
    const data = await response.json();
    
    return data;
}

export const getUserTransaction= async (accessToken) =>{
    
    const response = await fetch(process.env.API_URL+'/transaction/get-my-transaction/0/5', {
        headers: {
            Authorization: 'Bearer '+accessToken
        }
    })
    const data = await response.json();  

    return data;
}

export const postConfirmTransaction = async (param, accessToken)=>{
    var dataForm = new FormData();
    dataForm.append('codeTransaction', param.codeTransaction)
    dataForm.append('bank', param.bank);
    dataForm.append('accountNumber', parseInt(param.accountNumber));
    dataForm.append('accountName', param.accountName);
    dataForm.append('file', param.file);

    const response = await fetch(process.env.API_URL + '/confirmation', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+accessToken,
        },
        body: dataForm
    })
    if(response.ok){
        window.location.href = process.env.HOST_DOMAIN+'/user/trips';
    }
    const result = await response.json()
    return result
    
}

export const requestTrip = async (param, accessToken)=>{
    var dataForm = new FormData();
    dataForm.append('trip.id', param.tripId)
    dataForm.append('maxRider', param.maxRider);
    dataForm.append('startTimestamp', parseInt(param.startTimestamp));

    const response = await fetch(process.env.API_URL + '/request-trip/create', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+accessToken,
        },
        body: dataForm
    })
    const result = await response.json()
    return result
    
}