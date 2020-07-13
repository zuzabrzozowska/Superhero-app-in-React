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
                setLoading(false);
            } 
        })
        
    }, [name])

    return (
        <>
            <h1 className="about-hero__maintitle">results for: "{name}"</h1>

            {loading && <h1 className="about-hero__maintitle">loading......</h1>}

            {!loading && 
                <main className="container">
                    
                        
                    <section className="container__heroes">
                        { errorText && <p className="about-hero__maintitle">{errorText}</p> }
                        
                            
                        { searchResults.map(({id, name, image, work, biography }) => {
                            return (
                                <div className="about-hero" key={id}>
                                    <h2 className="about-hero__title">{name}</h2>
                                    <h3>{biography.alignment}</h3>
                                        
                                    <img className="about-hero__img" src={image.url} alt="hero"></img>
                                        
                                    { work.occupation !=='-' && <p>{work.occupation}</p>}
                                    { work.occupation ==='-' && <p>occupation unknown</p>}

                                    <Link className="link" to={`/${id}/${name}`}><button>More...</button></Link>
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
