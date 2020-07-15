import axios from 'axios';

const APIkey = '';
//paste in your key

export const getHeroPreview = async id => {
    
    const {data: powerstats} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/powerstats`);
    const {data: image} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/image`);

    return { powerstats, url: image.url, name: powerstats.name, id }
}

export const getSearchedHeroesByName = name => {
    return axios.get(`https://superheroapi.com/api/${APIkey}/search/${name}`);
}

export const getFullHero = async id => {
    const response = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/`);
    return response.data;  
}

