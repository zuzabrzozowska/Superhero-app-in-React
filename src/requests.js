import axios from 'axios';

const APIkey = '';
//paste in your key

export const getHeroPreview = async id => {
    
    const {data: powerstats} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/powerstats`);
    const {data: image} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/image`);

    return { powerstats, url: image.url, name: powerstats.name, id };
}

export const getHeroAppearance = async id => {
    const {data: appearance} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/appearance`);
    const {data: image} = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/image`);

    return { appearance, url: image.url };
}

export const getFullHero = async id => {
    const response = await axios.get(`https://superheroapi.com/api/${APIkey}/${id}/`);
    return response.data;  
}

