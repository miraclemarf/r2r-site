import fetch from 'isomorphic-unfetch';

export const getLatestGallery= async () =>{
    const galleryRes = await fetch(process.env.API_URL+'/gallery/all-galleries/0/5')
    const galleryData = await galleryRes.json();
    console.log(galleryData);
    
    return galleryData;
}

export const getDetailGallery = async (id) => {

    const result = await fetch(process.env.API_URL + '/gallery/detail/' + id)
    const data = await result.json()

    return data;
}