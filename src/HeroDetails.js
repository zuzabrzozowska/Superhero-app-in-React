import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFullHero } from 'axios';

function HeroDetails() {
    const { id, name } = useParams();
    const [hero, setHero] = useState({});
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);

    const getMyDetailedHero = async () => {
        //--> "Uncaught (in promise) TypeError: Object(...) is not a function" 
        const fullHero = await getFullHero(id);
        setHero(fullHero);
        setLoading(false);
    }

    useEffect(() => {
       getMyDetailedHero();
    }, [id])

    return (
        <>
            <h1 className="about-hero__maintitle">All about {name} :</h1>
            { errorText && <h1>{errorText}</h1>}
            { loading && <h1 className="about-hero__maintitle">loading........</h1>}

            { !loading && <h1 className="about-hero__maintitle"> now {name} is available to map</h1>}
            </>
    )
}

export default HeroDetails;