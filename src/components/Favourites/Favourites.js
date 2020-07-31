import React from 'react';
//import { Link } from 'react-router-dom';

function Favourites({favHeroes}) {
    

    return ( 
        <>
        <h1>favourite heroes array: </h1>

        {console.log({favHeroes})}

        {favHeroes.map(item => {
            return (
                
                <h1>{item.appearance.name}</h1>
            )
        })}
        </>
        
    )
}


export default Favourites;