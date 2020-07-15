import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
            <h1 className="about-hero__maintitle">All about {name} :</h1>
            { errorText && <h1>{errorText}</h1>}
            { loading && <h1 className="about-hero__maintitle">loading........</h1>}
    
            { !loading && 
            <div className="details-container"> 
                <img src={image.url} alt={name} className="details-image"></img>
                <div className="details-box">
                    
                    <ul>
                        <h2 className="details-subtitle">Appearance:</h2>
                        <li>race: {appearance.race},</li>
                        <li>height: {appearance.height[0]} ({appearance.height[1]}).</li>
                        
                    </ul>
                    <ul>
                        <h2 className="details-subtitle">Life:</h2>
                        <li>full name: {biography['full-name']},</li>
                        <li>alter egos: {biography["alter-egos"]}</li>
                        <li>aliases: {biography.aliases} </li>
                        <li>alignment: {biography.alignment} </li>
                        <li>place of birth: {biography["place-of-birth"]} </li>
                    </ul>     
                    <ul>
                        <h2 className="details-subtitle">Powerstats:</h2>
                        <li>intelligence: {powerstats.intelligence} </li>
                        <li>strength: {powerstats.strength} </li>
                        <li>combat: {powerstats.combat} </li>
                        <li>speed: {powerstats.speed} </li>
                        <li>durability: {powerstats.durability} </li>
                        <li>power: {powerstats.power} </li>
                    </ul>
                    <ul>
                        <h2 className="details-subtitle">Work:</h2>
                        <li>occupation: {work.occupation} </li>
                        <li>base: {work.base} </li>
                    </ul>
                </div>
            </div>
            }
        </>
    )
}
//<li>group affiliation: {work.connections['group-affiliation']} </li>
//<li>relatives: {work.connections.relatives} </li>
export default HeroDetails;