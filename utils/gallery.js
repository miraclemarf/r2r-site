import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getLatestGallery = () => async (dispatch) => {
    const url = `${API_URL}/gallery/all-galleries/0/5`
    const res = await fetch(url)
    const data = await res.json()
    return dispatch({ type: actionTypes.GALLERY_DATA, payload: data.object })
}

export const getDetailGallery = async (id) => {
    const url = `${API_URL}/gallery/detail/${id}`
    const res = await fetch(url)
    const data = await res.json()
    return data.object
}