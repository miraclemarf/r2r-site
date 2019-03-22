import fetch from 'isomorphic-unfetch';

export const getLatestTrips= async () =>{
    const tripsRes = await fetch('http://localhost:3000/api/trips?_start=0&_limit=4');
    const tripsData = await tripsRes.json();

    return tripsData;
}