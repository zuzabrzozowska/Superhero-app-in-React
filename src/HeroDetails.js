import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFullHero } from './requests';

function HeroDetails() {
    const { id, name } = useParams();
    const [hero, setHero] = useState({});
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);
    const {image, appearance, biography, powerstats, work} = hero;

    const getMyDetailedHero = async () => {
        const fullHero = await getFullHero(id);
        setHero(fullHero);
        setLoading(false);
    }

    useEffect(() => {
       getMyDetailedHero();
    }, [id])

    return (
        
        <>
            { errorText && <h1>{errorText}</h1>}
            { loading && <h1 className="about-hero__maintitle">loading {name} </h1>}

            { !loading && 
            
            <div className="details-container"> 
                <Link to="/" className="link link-homepage"><i className="icon-homepage fas fa-arrow-circle-left"></i></Link>
                <img src={image.url} alt={name} className="details-image"></img>
                
                <div className="details-box">
                    <h1 className="about-hero__maintitle"> {name} </h1>
                    <div><i className="fas fa-map-marker-alt"></i><span> {work.base} </span></div>
                    
                    <p className="bio">{work.occupation}</p> 

                    <ul>
                        <h2 className="details-subtitle">Appearance:</h2>
                        <li>race: {appearance.race}</li>
                        <li>height: {appearance.height[0]} ({appearance.height[1]})</li>
                        <li>weight : {appearance.weight[0]} ({appearance.weight[1]})</li>
                        
                    </ul>
                    <ul>
                        <h2 className="details-subtitle">Life:</h2>
                        <li>full name : {biography['full-name']},</li>
                        <li>alignment : {biography.alignment} </li>
                        <li>place of birth : {biography["place-of-birth"]} </li>
                    </ul>     
                    <ul>
                        <h2 className="details-subtitle">My powers:</h2>
                        <li><i class="far fa-lightbulb"></i> intelligence : {powerstats.intelligence}</li>
                        <li><i class="fas fa-bolt"></i> speed : {powerstats.speed}</li>
                        <li><i class="fas fa-fist-raised"></i> power : {powerstats.power}</li>
                    </ul>
                    
                </div>
            </div>
            }
        </>
    )
}

export default HeroDetails;
