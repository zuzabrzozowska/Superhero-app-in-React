import axios from 'axios';

export const getAndRenderHeroServer = (id) => {
    return (
        axios.get(`https://superheroapi.com/api/3084557188290018/${id}`)
    );
}

