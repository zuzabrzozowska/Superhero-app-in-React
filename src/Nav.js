import React, { useState } from 'react';
import { getSearchedHeroesByName } from './requests';
import { Link } from 'react-router-dom';

function Nav() {
    const [inputValue, setInputValue] = useState(''); 
    const [results, setResults] = useState([]);
    const [errorText, setErrorText] = useState(''); 
    const [loading, setLoading] = useState(false);

    const updateHeroInput = event => {
      setLoading(true);
      const value = event.target.value;
      setInputValue(value);
        
      if (inputValue) {
        setTimeout(() => {
          getSearchedHeroesByName(inputValue).then(response => {
            let res = response.data.results;
              
            if (response.data.error) {
              setErrorText(response.data.error);
              setResults([]);
              setLoading(false);
              return;
            }
              
            if (res) {
              res = res.filter(item => {return (item.appearance.gender === "Female") });
              setResults(res);
              setErrorText('');
            } 
            setLoading(false);
          })
        }, 2000)
      } 
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
                  { errorText && <p>{errorText}</p> }
                  { !errorText && loading && <p>loading........</p>}
                  { 
                    results && inputValue && !loading &&
                    <div>{results.map(item => 
                      <Link className="link" to={`/${item.id}/${item.name}`}>
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
