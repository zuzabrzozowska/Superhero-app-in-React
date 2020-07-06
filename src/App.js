import React from 'react';
import './App.css';
import { getHeroId } from './axios';

const myHeroes=[];
let value;

class App extends React.Component {
  constructor() {
    super();

    this.state= {
      heroList: [],
    }

  }

  getAndRenderHero = async () => {
    const heroes = []; //throwaway array
    for (const id of myHeroes) {
      const data = await getHeroId(id);
      heroes.push(data);
      this.setState({heroList: heroes});
    }
  }
  
  saveHeroInput = event => {
    value = event.target.value;
  }

  findHeroInput = event => {
    event.preventDefault();

    myHeroes.push(Math.floor(value));

    myHeroes.length > 3 ? myHeroes.shift([0]) : console.log(myHeroes);

    this.getAndRenderHero();
    document.getElementById('form').reset();
  }

  /*
  deleteHero = id => {
    const heroes = this.state.heroList.filter(item => {
      if (item.data.id !== id) {
        getHeroId(id);
        this.setState({heroList: heroes});  
      }
    })
  }
  */

  componentDidMount = () => {
    this.getAndRenderHero();
  }

  //{myHeroes && <p>find your heroes!</p> }
  render() {
    return (
      <React.Fragment>

        <nav>
          <div className="container container__nav">
            <span>superhero app</span>
            <form id="form">
              <input onChange={this.saveHeroInput} type="text"></input>
              <button onClick={this.findHeroInput}>find hero</button>
            </form>
          </div>
        </nav>
        <main>
          <div className="container">
            <h1 className="about-hero__maintitle">featured heroes</h1>
            <div className="container__heroes">
              {
                this.state.heroList.map(hero => {
                  return (
                    <div className="about-hero" key={hero.data.id}>
                      <button /* onClick={this.deleteHero(hero.data.id)}*/ className="delete">&times;</button>

                      <p className="about-hero__title">{hero.data.name}</p>
                      <img className="about-hero__img" src={hero.data.image.url} alt="hero"></img>

                      <p className="about-hero__title">{hero.data.biography.alignment}</p>

                      <p className={((hero.data.powerstats.intelligence)> 50 ? "bold" : "")}>intelligence: {hero.data.powerstats.intelligence}</p>
                      
                      <p>speed: {hero.data.powerstats.speed}</p>
                      
                      <p>base: {hero.data.work.base}</p>
                      <p>occupation: {hero.data.work.occupation}</p>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </main>

      </React.Fragment>
    );
  }

}

export default App;
