import fetch from 'isomorphic-unfetch'
// import moment from 'moment'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getLatestTrips = (page, total) => async (dispatch) => {
    const url = `${API_URL}/trips/${page}/${total}`
    const res = await fetch(url)
    const data = await res.json()
    dispatch({ type: actionTypes.TRIPS_TOTAL, payload: data.totalPage })
    return dispatch({ type: actionTypes.TRIP_LIST, payload: data.object })
}

export const getFeaturedTrip = () => async (dispatch) => {
    const url = `${API_URL}/trips/feature`
    const res = await fetch(url)
    const data = await res.json()
    
    return dispatch({ type: actionTypes.TRIP_FEATURED, payload: data.object })
}

export const getDetailTrip = (id)  => async (dispatch) =>  {
    const url = `${API_URL}/trip/${id}`
    const res = await fetch(url)
    const data = await res.json()
    
    return dispatch({ type: actionTypes.TRIP_DETAIL, payload: data.object })
}

export const getPriceTrip  = (id)  => async (dispatch) => {

    const result = await fetch(API_URL + '/trip/' + id + '/price')
    const data = await result.json()

    return dispatch({ type: actionTypes.TRIP_PRICE, payload: data.object })
}

export const getMotorTrip = (id) => async(dispatch)=>{
    const result = await fetch(API_URL + '/trip/motor/' + id )
    const data = await result.json()

    return dispatch({ type: actionTypes.TRIP_MOTOR, payload: data.object })

}
// bellow not yet changed into dispatch redux

export const confirmOrder = async (data) => {
    console.log(data);

}

export const checkout = async (data) => {
    var dataForm = new FormData();

    dataForm.append('trip.id', data.tripId)
    dataForm.append('notes', data.notes);
    dataForm.append('price', data.price);
    dataForm.append('startTimestamp', data.startDate);
    if (!data.bringOwnMotor) {
        dataForm.append('motor', data.motor);
    }
    else {
        dataForm.append('bringOwnMotor', data.bringOwnMotor);
    }

    if (!data.bringOwnHelm) {
        data.accessories.map((item, key) => {
            dataForm.append('accessories[' + key + '].id', item.id);
            dataForm.append('accessories[' + key + '].quantity', item.quantity);
            dataForm.append('accessories[' + key + '].size', item.size);
        })
    }
    else {
        dataForm.append('bringOwnHelm', data.bringOwnHelm);
    }


    const response = await fetch(process.env.API_URL + '/transaction/create', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + data.accessToken,
        },
        body: dataForm
    })
    const result = await response.json()
    return result
};