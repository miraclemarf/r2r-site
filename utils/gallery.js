import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getLatestGallery = (page, limit) => async (dispatch) => {
    const url = `${API_URL}/gallery/all-galleries/${page}/${limit}`
    const res = await fetch(url)
    const data = await res.json()
    dispatch({ type: actionTypes.GALLERY_TOTAL, payload: data.totalPage })
    return dispatch({ type: actionTypes.GALLERY_DATA, payload: data.object })
}

export const getDetailGallery = async (id) => { 
    const url = `${API_URL}/gallery/detail/${id}`
    const res = await fetch(url)
    const data = await res.json()
    return data.object
}

export const getUserGallery = (accessToken, page, limit, loadMore) => async (dispatch) => {
    const url = `${API_URL}/gallery/all-galleries/${page}/${limit}`
    const options = { headers: {Authorization: `Bearer ${accessToken}`} }
    const res = await fetch(url, options)
    const data = await res.json()
    if(!data.object.length) {
        dispatch({ type: actionTypes.MY_GALLERIES_FETCHED, payload: true })
    }
    return dispatch({ 
        type: loadMore ? actionTypes.MY_GALLERIES_MORE : actionTypes.MY_GALLERIES, 
        payload: data.object 
    })
}