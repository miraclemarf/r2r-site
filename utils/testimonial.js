import fetch from 'isomorphic-unfetch';

export const getLatestTestimonial= async () =>{
    const testimonialRes = await fetch(process.env.API_URL+'/testimonial/all-testimonials/0/5')
    const testimonialData = await testimonialRes.json();

    return testimonialData;
}

export const getDetailTestimonial = async (id) => {

    const result = await fetch(process.env.API_URL + '/testimonial/detail/' + id)
    const data = await result.json()

    return data;
}