import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getLatestMotor = () => async (dispatch) => {
    const url = `${API_URL}/motors`
    const res = await fetch(url)
    const data = await res.json()
    return dispatch({ type: actionTypes.MOTOR_DATA, payload: data.object })
}

export const getLatestMotorNonRedux = async () => {
    const url = `${API_URL}/motors`
    const res = await fetch(url)
    const data = await res.json()    
    return data
}
