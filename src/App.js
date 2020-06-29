import React from 'react';
import './App.css';
import { getAndRenderHeroServer } from './axios';

class App extends React.Component {
  constructor() {
    super();

    this.state= {
      hero: {
        name: '',
        image: ''
      },
      
      hero2: {
        name: '',
        image: ''
      },

      hero3: {
        name: '',
        image: ''
      },

      heroList: [],
    }

  }

  getAndRenderHero = () => {

    
    getAndRenderHeroServer(317).then (response => {
      this.setState({hero: response.data})
      this.state.heroList.push(this.state.hero)
    })

    getAndRenderHeroServer(624).then (response => {
      this.setState({hero2: response.data}) 
      this.state.heroList.push(this.state.hero2)
    })
  
    getAndRenderHeroServer(87).then (response => {
      this.setState({hero3: response.data}) 
      this.state.heroList.push(this.state.hero3)
    })
  
    //why this push doesnt work ?
    //this.state.heroList.push(this.state.hero, this.state.hero2, this.state.hero3);

    //why render always sees one less elements in heroList?

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
                    <div className="about-hero" key={hero.id}>
                      <p className="about-hero__title">{hero.name}</p>
                      <img className="about-hero__img" src={hero.image.url} alt="hero"></img>
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
