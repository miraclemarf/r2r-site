import fetch from 'isomorphic-unfetch';

export const getLatestMotor= async () =>{
    const result = await fetch(process.env.API_URL+'/motors')
    const data = await result.json()
    
    return data;
}

