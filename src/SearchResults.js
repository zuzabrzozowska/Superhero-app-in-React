import React, { useState, useEffect } from 'react';
import { getHeroPreview } from './requests';
import { useParams, Link } from 'react-router-dom';


function SearchResults() {
    //params -- filteredResults list ?
    const [filteredResults, setFilteredResults] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState(true);
    const id = 1;



    useEffect(() => {
        getHeroPreview(id).then(response => {
            const {data} = response;
            if (data.error) {
                setErrorText(data.error);
                return;
            }
            let {results} = data;

            if (results) {
                results = results.filter(item => {return (item.appearance.gender === "Female") });
                setFilteredResults(results);
                setLoading(false);
            } 
        })
        
    }, [])

    return (
        <>
            {loading && <h1 className="about-hero__maintitle">loading...</h1>}

            {!loading && 
                <main className="container">
                    <section className="container__heroes">
                        { errorText && <p className="about-hero__maintitle">{errorText}</p> }
                        
                            
                        { filteredResults.map(({ id, url, name }) => {
                            return (
                                <div className="about-hero" key={id}>
                                    <Link className="link" to={`/${id}/${name}`}>
                                        <div className="about-hero__img" style={{backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
                                            <p className="about-hero__title">{name}</p>
                                        </div>
                                    </Link>
                                    <div className="btn-box">
                                        <span className="btn-round btn-round--small">?</span>
                                        <span className="btn-round btn-round--no">&times;</span>
                                        <span className="btn-round btn-round--yes">&#10004;</span>
                                        <span className="btn-round btn-round--small"><i className="fas fa-eye" style={{color: 'white'}}></i></span>
                                    </div>
                                </div>
                            );  
                        })}
                    </section>
                </main> 
            }
        </>
    )
}

export default SearchResults;
