import React from 'react';
import './App.css';
import { getAndRenderHeroS } from './axios';

class App extends React.Component {
  constructor() {
    super();

    this.state= {
      heroList: [],
      hero: {
        name: '',
        image: ''
      }
    }

  }

  getAndRenderHero = () => {
    getAndRenderHeroS(317).then (response => {
      this.setState({hero: response.data}) 
      //console.log(this.state.hero)
    })
    getAndRenderHeroS(73).then (response => {
      this.setState({heroList: response.data}) 
      console.log(this.state.heroList)
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
              <div className="about-hero"></div>
              <div className="about-hero"></div>
            </div>
          </div>
        </main>

      </React.Fragment>
    );
  }

}

export default App;
