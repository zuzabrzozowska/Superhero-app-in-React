import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');

  const filterRace = event => {
    setRace(event.target.innerText);
  }
  const filterGender = event => {
    setGender(event.target.innerText);
  }
  
  return (
        <nav>
            <div className="container container__nav">
              <h1 className="about-hero__title">Search Settings</h1>

                <label>I'm looking for</label>
                <div className="settings__btn-box">
                  <button onClick={filterGender}>Female</button>
                  <button onClick={filterGender}>Male</button>
                  <button onClick={filterGender}>All</button>
                </div>
            
                <label>Race</label>
                <div className="settings__btn-box">
                  <button onClick={filterRace}>Human</button>
                  <button onClick={filterRace}>Alien</button>
                  <button onClick={filterRace}>Mutant</button>
                  <button onClick={filterRace}>Other</button>
                  <button onClick={filterRace}>All</button>
                </div>
          
                <label>Height (cm)</label><input type="range" min="150" max="250" name="height"></input>

                <Link to={`/settings/search/g/${gender}/r/${race}`}><button>Save</button></Link>
              
            </div>

            <Link to="/" className="link link-homepage"><i className="icon-homepage fas fa-arrow-circle-left"></i></Link>
        </nav>
    )
}

export default Nav;
