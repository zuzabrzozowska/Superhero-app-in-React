import React, { useState, useEffect } from 'react';
import { getSearchedHeroesByName } from './axios';
import { useParams, Link } from 'react-router-dom';


function SearchResults() {
    const { name } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSearchedHeroesByName(name).then(response => {
            const {data} = response;
            if (data.error) {
                setErrorText(data.error);
                return;
            }
            let {results} = data;

            if (results) {
                results = results.filter(item => {return (item.appearance.gender === "Female") });
                setSearchResults(results);
            } 
        })
        setLoading(false);
    }, [name])

    return (
        <>
            {loading && <p>Loading search results...</p>}

            {!loading && 
                <main className="container">
                    <h1 className="about-hero__maintitle">results for: "{name}"</h1>
                        
                    <section className="container__heroes">
                        { errorText && <p className="about-hero__maintitle">{errorText}</p> }
                        
                            
                        { searchResults.map(item => {
                            return (
                                <div className="about-hero" key={item.id}>
                                    <h2 className="about-hero__title">{item.name}</h2>
                                        <h3>{item.biography.alignment}</h3>
                                        
                                    <img className="about-hero__img" src={item.image.url} alt="hero"></img>
                                        
                                    { item.work.occupation !=='-' && <p>{item.work.occupation}</p>}
                                    { item.work.occupation ==='-' && <p>unknown occupation</p>}

                                    <Link className="link" to={`/${item.id}`}><button>More...</button></Link>
                                </div>
                            );  
                        })}
                    </section>
                </main> 
            }
        </>
    )
}

export default SearchResults;
