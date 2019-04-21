import fetch from 'isomorphic-unfetch';

export const getLatestTrips= async () =>{
    const tripsRes = await fetch('http://localhost:3000/api/trips?_start=0&_limit=4');
    const tripsData = await tripsRes.json();

    return tripsData;
}

export const getDetailTrip = async (id) =>{
    
    const result = await fetch(process.env.API_URL+'/trip/'+id)
    const data = await result.json()
    
    return data;
}

export const getPriceTrip = async (id) =>{
    
    const result = await fetch(process.env.API_URL+'/trip/'+id+'/price')
    const data = await result.json()
    
    return data;
}