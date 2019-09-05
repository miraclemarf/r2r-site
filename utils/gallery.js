import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getLatestGallery = (page, limit) => async (dispatch) => {
    const url = `${API_URL}/gallery/all-galleries/${page}/${limit}`
    const res = await fetch(url)
    const data = await res.json()
    dispatch(setGalleryLength(data.totalPage))
    return dispatch({ type: actionTypes.GALLERY_DATA, payload: data.object })
}

const setGalleryLength = (data) => (dispatch) => {
    return dispatch({ type: actionTypes.GALLERY_TOTAL, payload: data })
}

export const getDetailGallery = async (id) => { 
    const url = `${API_URL}/gallery/detail/${id}`
    const res = await fetch(url)
    const data = await res.json()
    return data.object
}