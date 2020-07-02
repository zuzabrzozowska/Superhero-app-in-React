import axios from 'axios';

const APIkey = '';
//paste your key

export const getHeroId = id => {
    return (
        axios.get(`https://superheroapi.com/api/${APIkey}/${id}`)
    );
}

