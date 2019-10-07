import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'

const API_URL = process.env.API_URL

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

export const getUserTransaction = (accessToken, page, limit, loadMore) => async (dispatch) => {
    const url = `${API_URL}/transaction/get-my-transaction/${page}/${limit}`
    const options = { headers: {Authorization: `Bearer ${accessToken}`} }
    const res = await fetch(url, options)
    const data = await res.json()
    return dispatch({ 
        type: loadMore ? actionTypes.MY_TRANSACTIONS_MORE : actionTypes.MY_TRANSACTIONS, 
        payload: data.object 
    })
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