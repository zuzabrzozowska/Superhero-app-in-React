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
      //push hero to heroList
    })
    getAndRenderHeroServer(624).then (response => {
      this.setState({hero2: response.data}) 
    })
    getAndRenderHeroServer(87).then (response => {
      this.setState({hero3: response.data}) 
    })

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
              
              
              <div className="about-hero">
                <p className="about-hero__title">{this.state.hero.name}</p>
                <img className="about-hero__img" src={this.state.hero.image.url} alt="hero"></img>
              </div>

              <div className="about-hero">
                <p className="about-hero__title">{this.state.hero2.name}</p>
                <img className="about-hero__img" src={this.state.hero2.image.url} alt="hero"></img>
              </div>

              <div className="about-hero">
                <p className="about-hero__title">{this.state.hero3.name}</p>
                <img className="about-hero__img" src={this.state.hero3.image.url} alt="hero"></img>
              </div>

            </div>
          </div>
        </main>

      </React.Fragment>
    );
  }

}

export default App;
