import React, { useState } from 'react';
import { getHeroAppearence } from './requests';
import { Link } from 'react-router-dom';

function Nav() {
    const [results, setResults] = useState([]);
    const [errorText, setErrorText] = useState(''); 
    const [allHeroesIDs, setAllHeroesIDs] = useState([]);

    const filterWomen = () => {
      //get list with all the ids from 1 to 731
      let ids = [];
      for (let i = 1; i <= 10; i++) {
        ids.push(i);
        console.log(ids);
      }
      console.log(ids);
      
      /* 
      getHeroAppearence(id).then(data => {
        if (data.error) {
          setErrorText(data.error);
          return;
        }

             
        if (res) {
          res = res.filter(item => {return (item.appearance.gender === "Female") });
          setResults(res);
          setErrorText('');
        } 
      })*/
    } 

  
    return (
        <nav>
            <div className="container container__nav">

              <Link to="/" className="link link-homepage"><i className="icon-homepage fas fa-arrow-circle-left"></i></Link>
              
              <label>I'm looking for</label><br/>
              <button onClick={filterWomen}>Women</button><button>Men</button><button>All</button>

              <br/>
              <label>Race</label><br/>
              <button>Human</button><button>Mutant</button><button>Other</button><button>All</button>
              <br/>
              <label>Height (cm)</label><br/>
              <input></input>
              <br/>
              <button>Save</button>

            </div>
        </nav>
    )
}

export default Nav;

/*<form id="form">
                <label>find by name</label>
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
                </form> */