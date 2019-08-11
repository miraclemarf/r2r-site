import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getLatestGallery = (page, total) => async (dispatch) => {
    const url = `${API_URL}/gallery/all-galleries/${page}/${total}`
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