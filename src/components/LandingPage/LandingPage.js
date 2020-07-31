import React, { useState, useEffect } from 'react';
import { getHeroPreview } from '../../requests.js';
import Loader from '../Loader/Loader.js';
import { Link } from 'react-router-dom'; 
import './LandingPage.css';

function LandingPage() {
    const initialHeroesIDs = ['720'];
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
            <div className="container__heroes">
                {errorText && <h1 className="about-hero__maintitle">{errorText}</h1>}
                {!errorText && loading && <div className="about-hero"><Loader/></div>}

                {!errorText && !loading &&
                    <> {
                    heroList.map(({id, url, name}) => {
                        return (
                            <div className="about-hero" key={id}>
                                <Link className="link" to={`/${id}/${name}`}>
                                    <div className="about-hero__img" style={{backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                        <p className="about-hero__title">{name}</p>
                                        <div className="gradient"></div>
                                    </div>
                                </Link>
                                <div className="btn-box">
                                    <span className="btn-round btn-round--small">?</span>
                                    <span className="btn-round btn-round--no">&times;</span>
                                    <span className="btn-round btn-round--yes"><i className="fas fa-star icon-fav"></i></span>
                                    <Link to={`/${id}/${name}`} className="btn-round btn-round--small"><i className="fas fa-eye" style={{color: 'white'}}></i></Link>
                                </div>
                            </div>
                        );
                    })
                } </> 
                }
                <div className="instructions-box">
                    <span className="instruction">set preferences</span>
                    <span className="instruction">set your profile</span>
                    <span className="instruction">check out your favourites</span>
                </div>
            </div>
        </>
    )
}


export default LandingPage;
