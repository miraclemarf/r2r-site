import fetch from 'isomorphic-unfetch';

export const getHelmList= async () =>{
    const result = await fetch(process.env.API_URL+'/accessories/riding%20pants')
    const data = await result.json()
    
    return data;
}

