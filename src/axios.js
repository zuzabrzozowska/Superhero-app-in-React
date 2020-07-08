import axios from 'axios';

const APIkey = '3084557188290018';
//paste your key

export const getHero = id => {
    return axios.get(`https://superheroapi.com/api/${APIkey}/${id}`)  
}

export const getSearchedHeroesByName = name => {
    return axios.get(`https://superheroapi.com/api/${APIkey}/search/${name}`)  
}
