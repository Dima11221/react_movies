// import React from 'react';
import {IMovie} from "../../types/Types.ts";
import style from './style.module.scss'


const Movie = (props: IMovie) => {
    const {
        Title: title,
        Year: year,
        imdbID: id,
        Type: type,
        Poster: poster,
    } = props;


    return (
        <div id={id} className={style.movieCard}>
            <div className="">
                {
                    poster === 'N/A' ?
                        <img className={style.poster} src={`https://placehold.co/350x450?text=${title}`}/>
                        :
                        <img className={style.poster} src={poster}/>
                }

            </div>
            <div className={`${style.cardContent} ${style.left}`}>
                <h3 className={style.title}>{title}</h3>
                <p>{year} <span className=''>{type}</span></p>
            </div>
        </div>);
}

export { Movie };