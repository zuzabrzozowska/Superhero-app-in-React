import React, { useState } from 'react';
import { getSearchedHeroesByName } from './axios';
import { Link } from 'react-router-dom';

function Nav() {
    const [inputValue, setInputValue] = useState(''); 
    const [results, setResults] = useState([]); 

    const updateHeroInput = event => {
        const value = event.target.value;
        setInputValue(value);
        
        setTimeout(() => {
          getSearchedHeroesByName(inputValue).then(response => {
            let res = response.data.results;
            if (res) {
              res = res.filter(item => {return (item.appearance.gender === "Female") });
              setResults(res);
            } 
          })
        }, 2000)
    }
    

    return (
        <nav>
            <div className="container container__nav">
              <Link to="/">
                <p className="app-logo">superhero<span className="underline">ine</span><br/>database logo</p>
              </Link>
              <form id="form">
                <input onChange={updateHeroInput} type="text" value={inputValue} placeholder="wonder..."></input>
                <Link to={`/search/${inputValue}`}><button>find heroes</button></Link>
                <div className="results-box">
                  { results && inputValue && <div>{results.map(item => <p>{item.name}</p>)}</div> }
                </div>
              </form>
            </div>
        </nav>
    )
}

export default Nav;