import axios from 'axios';

const APIkey = '3084557188290018';
//paste in your key

export const getHeroPreview = async id => {
    
    const {data: powerstats} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/powerstats`);
    const {data: image} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/image`);

    return { powerstats, url: image.url, name: powerstats.name, id }
}

export const getHeroAppearence = async id => {
    const {data} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/appearance`);
    return data;
}
export const getSearchedHeroesByName = name => {
    return axios.get(`https://superheroapi.com/api/${APIkey}/search/${name}`);
}

export const getFullHero = async id => {
    const response = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/`);
    return response.data;  
}

