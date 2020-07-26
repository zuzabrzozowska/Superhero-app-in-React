import React, { useState, useEffect } from 'react';
import { getHeroAppearance } from './requests';
import { useParams, Link } from 'react-router-dom';

function SearchResults() {
    const {gender, race} = useParams();
    const [filteredResults, setFilteredResults] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);

    let ids = [];
    let objectArray = [];
    
    const getAllHeroesIDs = () => {
        for (let i = 1; i <= 50; i++) {
            ids.push(i);
        }
    }
    
    useEffect(() => {
        getResultsGender();
        
    }, [])


    const getResultsGender = () => {
        getAllHeroesIDs();

        ids.forEach(id => {
            getHeroAppearance(id).then(data => {
              if (data.error) {
                setErrorText(data.error);
                return;
              }
              objectArray.push(data);
              if (gender !== 'All') {
                objectArray = objectArray.filter(item => {return (item.appearance.gender === `${gender}`) });
              } 
            }) 
        })
        setTimeout(() => {
            setFilteredResults(objectArray);
        }, 5000)
        
        getResultsRace();

    }

    const getResultsRace = () => {
        let array = [];
        filteredResults.forEach(id => {
            getHeroAppearance(id).then(data => {
              if (data.error) {
                setErrorText(data.error);
                return;
              }
              array.push(data);
              if (race !== 'All' && race !== 'Other') {
                array = array.filter(item => { return (item.appearance.race === `${race}`) });
              } else if (race === 'Other') {
                array = array.filter(item => {
                  return (item.race !== 'Human' && item.race !== 'Alien' && item.race !== 'Mutant') 
                });
              }
            }) 
        })
        setTimeout(() => {
            setFilteredResults(array);
        }, 5000)
        setLoading(false);
    }

    return (
        <>
            <Link to="/settings"><i style={{fontSize: '30px'}}className="fas fa-cog"></i></Link>
            {loading && <h1 className="about-hero__maintitle">loading results</h1>}

            {!loading && 
                <main className="container">
                    <section className="container__heroes">
                        { errorText && <p className="about-hero__maintitle">{errorText}</p> }
                      
                    </section>
                </main> 
            }
            { filteredResults && 
            <div>
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
                                <span className="btn-round btn-round--yes">&#10004;</span>
                                <span className="btn-round btn-round--small"><i className="fas fa-eye" style={{color: 'white'}}></i></span>
                            </div>
                        </div>
                    </>
                    )
                })} 
            </div> }
        </>
    )
}

export default SearchResults;
