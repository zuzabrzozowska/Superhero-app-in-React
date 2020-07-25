import React, { useState, useEffect } from 'react';
import { getHeroPreview } from './requests';
import { Link } from 'react-router-dom'; 

function LandingPage() {
    const initialHeroesIDs = ['720', '69'];
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
            <Link to="/settings"><i style={{fontSize: '30px'}}className="fas fa-cog"></i></Link>
            {errorText && <h1 className="about-hero__maintitle">{errorText}</h1>}
            {!errorText && loading && <h1 className="about-hero__maintitle">loading</h1>}

            {!errorText && !loading &&
                <div className="container__heroes">
                    {
                        heroList.map(({id, url, name}) => {
                            return (
                                <div className="about-hero" key={id}>
                                    <Link className="link" to={`/${id}/${name}`}>
                                        <div className="about-hero__img" style={{backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                            <p className="about-hero__title">{name}</p>
                                        </div>
                                    </Link>
                                    <div className="btn-box">
                                        <span className="btn-round btn-round--small">?</span>
                                        <span className="btn-round btn-round--no">&times;</span>
                                        <span className="btn-round btn-round--yes">&#10004;</span>
                                        <span className="btn-round btn-round--small"><i className="fas fa-eye" style={{color: 'white'}}></i></span>
                                    </div>
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
