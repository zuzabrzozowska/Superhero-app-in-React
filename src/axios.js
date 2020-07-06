import axios from 'axios';

const APIkey = '3084557188290018';
//paste your key

export const getHeroId = id => {
    return axios.get(`https://superheroapi.com/api/${APIkey}/${id}`)  
}

