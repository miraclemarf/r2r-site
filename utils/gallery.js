import fetch from 'isomorphic-unfetch'
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

// export default class {
//     static async getLatestGallery() {
//         const url = `${API_URL}/gallery/all-galleries/0/5`
//         const res = await fetch(url)
//         const data = await res.json()
//         return data.object
//     }
//     static async getDetailGallery(id) {
//         const url = `${API_URL}/gallery/detail/${id}`
//         const res = await fetch(url)
//         const data = await res.json()
//         return data.object
//     }
// }

export const getLatestGallery = () => async (dispatch) => {
    const url = `${API_URL}/gallery/all-galleries/0/5`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.object)
    return dispatch({ type: actionTypes.GALLERY_DATA, payload: data.object })
}

export const getDetailGallery = async (id) => {
    const url = `${API_URL}/gallery/detail/${id}`
    const res = await fetch(url)
    const data = await res.json()
    return data.object
}

// export const getLatestGallery = async () => {
//     return (dispatch) => {
//         console.log('-------')
//         console.log(dispatch)
//         // const galleryRes = await fetch(process.env.API_URL+'/gallery/all-galleries/0/5')
//         // const galleryData = await galleryRes.json()
//         // dispatch({type: actionTypes.GALLERY_DATA, payload: galleryData.object})
//     }
//     // const galleryRes = await fetch(process.env.API_URL+'/gallery/all-galleries/0/5')
//     // const galleryData = await galleryRes.json()
//     // return galleryData
// }

// export const getDetailGallery = async (id) => {

//     const result = await fetch(process.env.API_URL + '/gallery/detail/' + id)
//     const data = await result.json()

//     return data;
// }