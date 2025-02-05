// import React from 'react';
import {IMovie} from "../../types/Types.ts";
// import { IMovieDetails } from "../../types/Types.ts";
import style from './style.module.scss'
import {useState} from "react";
// import App from "../../App.tsx";
import {AppDispatch, RootState} from "../../store/store.ts";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovieDetails} from "../../store/reducers/thunk.ts";


// export interface IMovieDetails {
//     Plot?: string;
//     imdbRating?: string;
//     Rated?: string;
// }

const Movie = (props: IMovie) => {
    const {
        Title: title,
        Year: year,
        imdbID: id,
        Type: type,
        Poster: poster,
    } = props;


    const dispatch = useDispatch<AppDispatch>();
    const { movieDetails, loading, error } = useSelector((state: RootState) => state.movies);
    const [isVisible, setIsVisible] = useState(false);


    const details = movieDetails[id];
    // console.log(details)

    const fetchDetails = async (): Promise<void> => {
        dispatch(fetchMovieDetails(id))
    };


    const toggleVisibility = () => {
        if (isVisible) {
            setTimeout(() => {
                setIsVisible(false);
            }, 150)
        } else {
            setIsVisible(true);
        }
    };


    const handleClick = () => {
        // console.log('hi1')
        fetchDetails()
            .then(() => {
                toggleVisibility();
                // console.log('hi2')
            })
            .catch((error) => {
                console.error('Error when receiving data:', error);
            })

    }

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

                <button className={style.btn} onClick={handleClick} disabled={loading}>
                    {loading ? 'Loading...' : 'More details'}
                </button>

                <div className={`${style.movieDetails} ${isVisible ? `${style.visible}` : `${style.hidden}`}`}>
                    {details && (
                        <div className=''>
                            <p>Рейтинг IMDb: {details.imdbRating ?? 'N/A'}</p>
                            <p>Возрастная категория: {details.Rated ?? 'No information...'}</p>
                            <p className={style.detail}>Сюжет: {details.Plot ?? 'No information...'}</p>
                        </div>
                    )}
                    {error && (<p>{error}</p>)}
                </div>

            </div>

        </div>);
}

export { Movie };