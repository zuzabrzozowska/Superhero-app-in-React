import React, {useState} from 'react';
import './Favourites.css';
import { Link } from 'react-router-dom';

function Favourites({favHeroes}) {
    const [favHeroesState, setFavHeroesState] = useState(favHeroes);

    const deleteFromFavs = event => {
        favHeroes = favHeroes.filter(item => {return (item.appearance.id !== event.target.dataset.id)});
        setFavHeroesState(favHeroes);
    }

    return ( 
        <>
            <span className="btn-round btn-round--small">?</span>
            <h1 className="about-hero__title">Favourites:</h1>
            
            <div className="favourites-container">
                {favHeroesState && <>
                { favHeroesState.map(hero => {
                    return (
                    <div className="about-hero about-hero--favs" key={hero.appearance.id}>
                            <Link className="link" to={`/${hero.appearance.id}/${hero.appearance.name}`}>
                                <div className="about-hero__img about-hero__img--favs" style={{backgroundImage: `url(${hero.url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                    <p className="about-hero__title">{hero.appearance.name}</p>
                                </div>
                            </Link>
                            <div className="btn-box btn-box--favs"> 
                                <span onClick={deleteFromFavs} data-id={hero.appearance.id} className="btn-round btn-round--no">&times;</span>
                            </div>
                    </div>
                    )
                })} 
                </>
                
                }
                
            </div>
        </>
    )
}


export default Favourites;