import React from 'react';
import './App.css';
import { getHeroId } from './axios';

const myHeroes = [317, 87, 624]

class App extends React.Component {
  constructor() {
    super();

    this.state= {
      heroList: [],
    }

  }

  getAndRenderHero = async () => {

    const heroes = [];

    for (const id of myHeroes) {
      const data = await getHeroId(id);
      heroes.push(data);
      this.setState({heroList: heroes});
    }
    
    
    /*
    If you want to read the files in sequence, you cannot use forEach. Use a modern for … of loop instead
      
      myHeroes.forEach(id => {
        getHeroId(id).then (response => {
        heroes.push(response.data);
        this.setState({heroList: heroes});
      })
    }) */


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
            <form>
              <input type="text"></input>
              <button>find hero</button>
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
                      <p className="about-hero__title">{hero.data.name}</p>
                      <img className="about-hero__img" src={hero.data.image.url} alt="hero"></img>
                    </div>
                  )
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
