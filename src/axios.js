import axios from 'axios';

export const getHeroId = id => {
    return (
        axios.get(`https://superheroapi.com/api/3084557188290018/${id}`)
    );
}

