import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

function Nav() {
  const [race, setRace] = useState('All');
  const [gender, setGender] = useState('All');
  const [chosenHeight, setChosenHeight] = useState('250');

  const filterRace = event => {
    event.target.className ? event.target.className = '' : event.target.className = 'clicked-button';
    setRace(event.target.innerText);
  }
  const filterGender = event => {
    event.target.className ? event.target.className = '' : event.target.className = 'clicked-button';
    setGender(event.target.innerText);
  }
  
  const saveHeight = event => {
    const height = event.target.value;
    setChosenHeight(height);
  }

  return (
        <>
            <div className="container container__settings">
              <h1 className="about-hero__title">Search Settings</h1>

                <label>I'm looking for (choose one option)</label>
                <div className="settings__btn-box">
                  <button onClick={filterGender}>Female</button>
                  <button onClick={filterGender}>Male</button>
                  <button onClick={filterGender}>All</button>
                </div>
            
                <label>Race (choose one option)</label>
                <div className="settings__btn-box">
                  <button onClick={filterRace}>Human</button>
                  <button onClick={filterRace}>Alien</button>
                  <button onClick={filterRace}>Mutant</button>
                  <button onClick={filterRace}>Other</button>
                  <button onClick={filterRace}>All</button>
                </div>
                <div className="height-box">
                  <label>Max height (cm)</label>
                  <div className="centerHeight">200</div>
                  <input onChange={saveHeight} type="range" min="150" max="250" name="height"></input>
                </div>
                <Link to={`/search/g/${gender}/r/${race}/maxHeight${chosenHeight}`}><button>Save</button></Link>
              
            </div>

            <Link to="/" className="link link-homepage"><i className="icon-homepage fas fa-arrow-circle-left"></i></Link>
        </>
    )
}

export default Nav;
