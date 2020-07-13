import React, { useState, useEffect } from 'react';
import { getHeroPreview } from './axios';
import { Link } from 'react-router-dom';

function LandingPage() {
    const initialHeroesIDs = ['107', '720', '444'];
    const [heroList, setHeroList] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInitialHeroes();
    }, [])
    
    const getInitialHeroes = async () => {
        let heroes = [];
        for (const id of initialHeroesIDs) {
            const data = await getHeroPreview(id);
            
            heroes.push(data);
            
            if (data.error) {
                setErrorText(data.error);
                return;
            }   
        }
        setHeroList(heroes);
        setLoading(false);
    }


    return ( 
        <> 
            <h1 className="about-hero__maintitle">featured superheroines</h1>
            {errorText && <h1 className="about-hero__maintitle">{errorText}</h1>}
            {!errorText && loading && <h1 className="about-hero__maintitle">loading........</h1>}
            {!errorText && !loading &&
                <div className="container__heroes">
                    {
                        heroList.map(({id, powerstats, url, name}) => {
                            return (
                                <div className="about-hero" key={id}>
                                    <p className="about-hero__title">{name}</p>
                                    <img className="about-hero__img" src={url} alt="hero"></img>
                                    <p>intelligence: {powerstats.intelligence}</p>
                                    <p>combat: {powerstats.combat}</p>
                                    <p>strength: {powerstats.strength}</p>
                                    <p>speed: {powerstats.speed}</p>
                                    <Link className="link" to={`/${id}/${name}`}><button>More...</button></Link>
                                </div>
                            );
                        })
                    }
                </div> 
            }
        </>
    )
}


export default LandingPage;
