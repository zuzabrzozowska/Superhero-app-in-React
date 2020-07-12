import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHeroDetails } from 'axios';

function HeroDetails() {
    const { id } = useParams();
    const [hero, setHero] = useState({});

    useEffect(() => {
        getHeroDetails(id).then(response => {

            console.log('id', id); //--> TypeError: Object(...) is not a function
            /*
            if (data.error) {
               console.log(data.error);
                return;
            }
            setHero(data);
            if (data.appearance.gender !== "Female") {
                console.log('superheroine with this id not found');
            } */
        })
    }, [id])

    return (
        <h1>hello</h1>
    )
}

export default HeroDetails;