import React, { useState, useEffect } from 'react';
import { getHeroPreview } from './axios';
import { Link } from 'react-router-dom';

function OurInitialPage() {
    const initialHeroesIDs = ['107', '730', '444'];
    const [heroList, setHeroList] = useState([]);

    useEffect(() => {
        getInitialHeroes();
    }, [])
    
    const getInitialHeroes = async () => {
        let heroes = [];
        for (const id of initialHeroesIDs) {
            const data = await getHeroPreview(id);
            
            heroes.push(data);
            
            if (data.error) {
              return;
            }   
        }
        setHeroList(heroes);
    }


    return ( 
        <> 
            <h1 className="about-hero__maintitle">featured heroines</h1>
            <div className="container__heroes">
                {
                    heroList.map(hero => {
                        return (
                            <div className="about-hero" key={hero[0].id}>
                                <p className="about-hero__title">{hero[0].name}</p>
                                <img className="about-hero__img" src={hero[1].url} alt="hero"></img>
                                <p>intelligence: {hero[0].intelligence}</p>
                                <p>combat: {hero[0].combat}</p>
                                <p>strength: {hero[0].strength}</p>
                                <p>speed: {hero[0].speed}</p>
                                <Link className="link" to={`/${hero[0].id}`}><button>More...</button></Link>
                            </div>
                        );
                    })
                }
            </div> 
        </>
    )
}


export default OurInitialPage;
