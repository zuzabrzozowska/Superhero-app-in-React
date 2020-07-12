import axios from 'axios';

const APIkey = '3084557188290018';
//paste your key

export const getHeroPreview = async id => {
    
    const {data: powerstats} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/powerstats`);
    const {data: image} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/image`);

    return [powerstats, {url: image.url} ]
}

export const getSearchedHeroesByName = name => {
    return axios.get(`https://superheroapi.com/api/${APIkey}/search/${name}`)  
}

export const getHeroDetails = id => {
    return axios.get(`https://superheroapi.com/api/${APIkey}/${id}/`);
}
