import axios from 'axios';

export const getAndRenderHeroS = (id) => {
    return (
        axios.get(`https://superheroapi.com/api/3084557188290018/${id}`)
    );
}

//axios.get('https://superheroapi.com/api/3084557188290018/73')
