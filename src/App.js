import React from 'react';
import './App.css';
import { getHeroId } from './axios';

//let myHeroes=[];
let value;

class App extends React.Component {
  constructor() {
    super();

    this.state= {
      heroList: [],
      myHeroesID: [],
      isLoading: true
    }
  
  }

  getAndRenderHero = async () => {
    const heroes = []; //throwaway array
    for (const id of this.state.myHeroesID) {
      const data = await getHeroId(id);
      heroes.push(data);
      this.setState({heroList: heroes});
    }
    this.setState({isLoading: false})
  }
  
  saveHeroInput = event => {
    value = event.target.value;
  }

  findHeroInput = event => {
    event.preventDefault();

    this.state.myHeroesID.push(Math.floor(value));

    if (this.state.myHeroesID.length > 3) { 
      this.state.myHeroesID.shift([0])
    }

    this.getAndRenderHero();
    document.getElementById('form').reset();
  }

  
  deleteHero = (id) => {
    const myHeroes = this.state.heroList.filter(item => {
      return (item.data.id !== id);
    })
    this.setState({heroList: myHeroes});
    const heroesIDS = this.state.myHeroesID.filter(item => {
      return (item !== Math.floor(id));
    })
    this.setState({myHeroesID: heroesIDS});
  }
  

  componentDidMount = () => {
    this.getAndRenderHero();
  }

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
                      <button onClick={() => this.deleteHero(hero.data.id)} className="delete">&times;</button>
                      
                      <p className="about-hero__title">{hero.data.name}</p>
                      <img className="about-hero__img" src={hero.data.image.url} alt="hero"></img>

                      <p className="about-hero__title">{hero.data.biography.alignment}</p>

                      <p className={((hero.data.powerstats.intelligence)> 50 ? "bold" : "")}>intelligence: {hero.data.powerstats.intelligence}</p>
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
