import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL
const API_DUMMY_URL = process.env.API_DUMMY_URL

export const getLatestGallery = (page, limit) => async (dispatch) => {
    const url = `${API_URL}/gallery/all-galleries/${page}/${limit}`
    // const url = `${API_DUMMY_URL}/gallery?_start=${page*limit}&_limit=${limit}`
    const res = await fetch(url)
    // const headers = await res.headers
    // const total = await headers.get('x-total-count')
    // dispatch(setGalleryLength(total))
    const data = await res.json()
    return dispatch({ type: actionTypes.GALLERY_DATA, payload: data.object })
    // return dispatch({ type: actionTypes.GALLERY_DATA, payload: data })
}

const setGalleryLength = (data) => (dispatch) => {
    return dispatch({ type: actionTypes.GALLERY_TOTAL, payload: data })
}

export const getDetailGallery = async (id) => { 
    const url = `${API_URL}/gallery/detail/${id}`
    // const url = `${API_DUMMY_URL}/gallery/${id}`
    const res = await fetch(url)
    const data = await res.json()
    return data.object
    // return data
}