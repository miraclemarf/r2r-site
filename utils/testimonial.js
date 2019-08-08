import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getLatestTestimonial = (page, total) => async (dispatch) => {
    const url = `${API_URL}/testimonial/all-testimonials/${page}/${total}`
    const res = await fetch(url)
    const data = await res.json()
    return dispatch({ type: actionTypes.TESTIMONIALS_DATA, payload: data.object })
}

export const getDetailTestimonial = async (id) => {
    const url = `${API_URL}/testimonial/detail/${id}`
    const res = await fetch(url)
    const data = await res.json()
    return data.object
}