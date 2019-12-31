import fetch from 'isomorphic-unfetch';
import { actionTypes } from '../components/types'
const API_URL = process.env.API_URL

export const getHelmList= async () =>{
    const result = await fetch(process.env.API_URL+'/accessories/helmet')
    const data = await result.json()
    
    return data;
}

export const getAccessories = () => async(dispatch) =>{
    const url = `${API_URL}/accessory-categories`
    const res = await fetch(url)
    const data = await res.json()    
    
    return dispatch({ type: actionTypes.ACCESSORIES_CATEGORY, payload: data.object })
}

export const getSubAccessories = (id) => async(dispatch) =>{
    const url = `${API_URL}/accessory-categories/${id}/accessory-sub-categories`
    const res = await fetch(url)
    const data = await res.json() 
    return dispatch({ type: actionTypes.ACCESSORIES_SUBCATEGORY, payload: data.object })
}

export const getAccessoriesItem = (subId, catId) => async(dispatch) =>{
    const url = `${API_URL}/accessories/by-sub-category?subCategoryId=${subId}&categoryId=${catId}`
    const res = await fetch(url)
    const data = await res.json()    
    return dispatch({ type: actionTypes.ACCESSORIES_DATA, payload: data.object })
}

export const getAccessoriesDetail = (id) => async(dispatch) =>{
    const url = `${API_URL}/accessories/detail?accessoryId=${id}`
    const res = await fetch(url)
    const data = await res.json()    
    return dispatch({ type: actionTypes.ACCESSORIES_DETAIL, payload: data.object })
}

