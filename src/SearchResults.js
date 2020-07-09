import React, { useState, useEffect } from 'react';
import { getSearchedHeroesByName } from './axios';
import { useParams } from 'react-router-dom';


function SearchResults() {
    const { name } = useParams;
    const [searchResults, setSearchResults] = useState([]);
    const [ errorText, setErrorText] = useState('');

    useEffect(() => {
        getSearchedHeroesByName(name).then(response => {
            const {data} = response;
            console.log(response); //--> error: character with given name not found

            console.log(data);
            if (data.error) {
                setErrorText(data.error);
                return;
            }
            const {results} = data;
            setSearchResults(results);
            console.log(results);
        })
    }, [name])

    return (
        <div className="container__heroes">
            {errorText && <p>{errorText}</p>}
            {
              searchResults.map(result => {
                return (
                  <div className="about-hero" key={result.data.id}>
                    <p className="about-hero__title">{result.data.name}</p>
                    <img className="about-hero__img" src={result.data.image.url} alt="hero"></img>
                  </div>
                );
              })
            }
        </div> 
    )
}

export default SearchResults;