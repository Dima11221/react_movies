import React, {useEffect, useState} from 'react';
import { Movies } from '../components/Movies.tsx';
import { Search } from '../components/Search.tsx';
import {Preloader} from "../components/Preloader.tsx";


const API_KEY = import.meta.env.VITE_APP_API;

const Main = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);



    const searchMovies = (str, type = 'all') => {
        // setLoading(true);
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all' ? `&type=${type}` : ''}`, {})
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.Search);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=terminator`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.Search);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
        }, []);






    return (
        <main className="container content">
            <Search searchMovies={searchMovies}/>
            {
                loading ? (
                    <Preloader />
                ) : <Movies movies={movies} searchMovies={searchMovies} />
            }
        </main>
    );

}

export { Main }