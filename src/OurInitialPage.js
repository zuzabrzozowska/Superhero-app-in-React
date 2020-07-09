import React, { useState, useEffect } from 'react';
import { getHeroById } from './axios';

function OurInitialPage() {
    const [initialHeroesIDs, setInitialHeroesIDs] = useState(['107', '730']);
    const [heroList, setHeroList] = useState([]); //initialpage

    useEffect(() => {
        getInitialHeroes();
    }, [])
    
    const getInitialHeroes = async () => {
        const heroes = []; //throwaway array
        if(initialHeroesIDs) {
          for (const id of initialHeroesIDs) {
            const data = await getHeroById(id);
            heroes.push(data);
            setHeroList(heroes);
            if (data.error) {
              return;
            }
          }
        }
    }


    return (
        <>
            <h1 className="about-hero__maintitle">featured heroines</h1>
            <div className="container__heroes">
                {
                    heroList.map(hero => {
                        const {id, name} = hero.data;
                        return (
                            <div className="about-hero" key={id}>
                                <p className="about-hero__title">{name}</p>
                                <img className="about-hero__img" src={hero.data.image.url} alt="hero"></img>
                                <p className="about-hero__title">{hero.data.biography.alignment}</p>
                                <p>{hero.data.biography["full-name"]}, {hero.data.biography["alter-egos"]}</p>
                                <p>intelligence: {hero.data.powerstats.intelligence}</p>
                                <p>occupation: {hero.data.work.occupation}</p>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}

export default OurInitialPage;