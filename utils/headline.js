import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getHeadline = () => async (dispatch) => {
    const url = `${API_URL}/headline`
    const res = await fetch(url)
    const data = await res.json()
    return dispatch({ type: actionTypes.HEADLINE_DATA, payload: data.object })
}