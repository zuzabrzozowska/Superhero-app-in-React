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
              <Link to="/" className="link"><p className="app-logo">SUPERHERO<span className="underline">INE</span><br/>DATABASE</p></Link>
              <form id="form">
                <input onChange={updateHeroInput} type="text" value={inputValue} placeholder="wonder..." />
                <Link className="link btn-search" to={`/search/${inputValue}`}>
                  <button onClick={() => setResults([])}><i className="fas fa-search" /></button>
                </Link>
                <div className="results-box">
                  { 
                    results && inputValue && 
                    <div>{results.map(item => 
                      <Link className="link" to={`/search/${item.name}`}>
                        <button onClick={() => setResults([])}>{item.name}</button>
                      </Link>)}
                    </div> 
                  }
                </div>
              </form>
            </div>
        </nav>
    )
}

export default Nav;