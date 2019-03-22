import fetch from 'isomorphic-unfetch';

export const getLatestGallery= async () =>{
    const galleryRes = await fetch('http://localhost:3000/api/gallerys?_start=10&_limit=5');
    const galleryData = await galleryRes.json();

    return galleryData;
}