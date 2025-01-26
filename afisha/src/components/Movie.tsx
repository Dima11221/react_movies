// import React from 'react';
import {IMovie} from "../types/Types.ts";


const Movie = (props: IMovie) => {
    const {
        Title: title,
        Year: year,
        imdbID: id,
        Type: type,
        Poster: poster,
    } = props;


    return (
        <div id={id} className="movie card">
            <div className="">
                {
                    poster === 'N/A' ?
                        <img className="activator" src={`https://placehold.co/350x450?text=${title}`}/>
                        :
                        <img className="activator" src={poster}/>
                }

            </div>
            <div className="card-content">
                <span className="">{title}</span>
                <p>{year} <span className="right">{type}</span></p>
            </div>
        </div>);
}

export { Movie };