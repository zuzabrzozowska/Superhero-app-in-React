import React, { useState, useEffect } from 'react';
import { getHeroAppearance } from '../../requests.js';
import { useParams, Link } from 'react-router-dom';
import Loader from '../Loader/Loader.js';

function SearchResults( {addHeroToFav} ) {
    const {gender, race, height} = useParams();
    const [filteredResults, setFilteredResults] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);

    let ids = [];
    let objectArray = [];
    
    const getAllHeroesIDs = () => {
        for (let i = 100; i <= 150; i++) {
            ids.push(i);
        }
    }
    
    useEffect(() => {
        getResults();
    }, [])

    const getResults = () => {
        getAllHeroesIDs();

        ids.forEach(id => {
            getHeroAppearance(id).then(data => {
              if (data.error) {
                setErrorText(data.error);
                return;
              }
              objectArray.push(data);
              if (gender !== 'All') {
                if (race !== 'Other' && race !== 'All') {
                    objectArray = objectArray.filter(({appearance}) => {return (appearance.gender === `${gender}` && appearance.race === `${race}`) })
                } else if (race === 'Other') {
                    objectArray = objectArray.filter(({appearance}) => {return (appearance.gender === `${gender}` && 
                    appearance.race !== 'Human' && appearance.race !== 'Alien' && appearance.race !== 'Mutant') })
                } else if (race === 'All') {
                    objectArray = objectArray.filter(({appearance}) => {return (appearance.gender === `${gender}`) })
                }
              } else {
                if (race !== 'Other' && race !== 'All') {
                    objectArray = objectArray.filter(({appearance}) => {return (appearance.race === `${race}`) })
                } else if (race === 'Other') {
                    objectArray = objectArray.filter(({appearance}) => {return (appearance.race !== 'Human' && appearance.race !== 'Alien' && appearance.race !== 'Mutant') })
                } //add height filtering!
              }
            }) 
        })
        setTimeout(() => {
            setFilteredResults(objectArray);
            setLoading(false);
        }, 5000)
    }

    return (
        <>
            {loading && 
                <main className="container">
                    <section className="container__heroes">
                        { errorText && <p className="about-hero__maintitle">{errorText}</p> }
                        <div className="about-hero"><Loader/></div>
                    </section>
                </main> 
            }
            { !loading && filteredResults && 
            <main>
                { filteredResults.map(hero => {
                    return (
                    <>
                        <div className="about-hero" key={hero.appearance.id}>
                            <Link className="link" to={`/${hero.appearance.id}/${hero.appearance.name}`}>
                                <div className="about-hero__img" style={{backgroundImage: `url(${hero.url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                    <p className="about-hero__title">{hero.appearance.name}</p>
                                    <div className="gradient"></div>
                                </div>
                            </Link>
                            <div className="btn-box"> 
                                <span className="btn-round btn-round--small">?</span>
                                <span className="btn-round btn-round--no">&times;</span>
                                <span data-id={hero.appearance.id} onClick={addHeroToFav} className="btn-round btn-round--yes"><i data-id={hero.appearance.id} className="fas fa-star icon-fav"></i></span>
                                <Link to={`/${hero.appearance.id}/${hero.appearance.name}`} className="btn-round btn-round--small"><i className="fas fa-eye" style={{color: 'white'}}></i></Link>
                            </div>
                        </div>
                    </>
                    )
                })} 
            </main> }
        </>
    )
}

export default SearchResults;
