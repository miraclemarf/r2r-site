import fetch from 'isomorphic-unfetch';
import moment from 'moment';

export const getLatestTrips = async () => {
    const tripsRes = await fetch(process.env.API_URL + '/trips/0/10');
    const tripsData = await tripsRes.json();

    return tripsData;
}

export const getDetailTrip = async (id) => {

    const result = await fetch(process.env.API_URL + '/trip/' + id)
    const data = await result.json()

    return data;
}

export const getPriceTrip = async (id) => {

    const result = await fetch(process.env.API_URL + '/trip/' + id + '/price')
    const data = await result.json()

    return data;
}

export const confirmOrder = async (data) => {
    console.log(data);

}

export const checkout = async (data) => {
    var dataForm = new FormData();

    dataForm.append('trip.id', data.tripId)
    dataForm.append('notes', data.notes);
    dataForm.append('price', data.price);
    dataForm.append('startTimestamp', data.startDate);
    dataForm.append('motor', data.motor);
    data.accessories.map((item, key) => {
        dataForm.append('accessories[' + key + '].id', item.id);
        dataForm.append('accessories[' + key + '].size', item.size);
    })

    const response = await fetch(process.env.API_URL + '/transaction/create', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + data.accessToken,
        },
        body: dataForm
    })
    const result = await response.json()
    return result
};