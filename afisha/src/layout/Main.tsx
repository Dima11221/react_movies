import {useEffect, useState} from 'react';
import { Movies } from '../components/Movies.tsx';
import { Search } from '../components/Search.tsx';
import {Preloader} from "../components/Preloader.tsx";
import {IMovie} from "../types/Types.ts";

interface IProps {
    str: string;
    filterType: 'all' | 'movie' | 'series' | 'game';
}

interface IApiResponse {
    Search?: IMovie[];
    totalResults: string;
    Response: string;
    Error?: string;
}

const Main = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [type, setType] = useState<'all' | 'movie' | 'series' | 'game'>("all");
    const [query, setQuery] = useState<string>("terminator");



    const fetchMovies = (params: IProps) => {
        const {str = 'terminator', filterType = 'all'} = params;
        setLoading(true);
        fetch(`https://www.omdbapi.com/?apikey=90157240&s=${str}${filterType !== 'all' ? `&type=${filterType}` : ''}`, {})
            .then((response) => response.json())
            .then((data: IApiResponse) => {
                setMovies(data.Search || []);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    const searchMovies = ({str, filterType}:IProps) => {
        setQuery(str)
        setType(filterType);
        fetchMovies({str, filterType});
    }

    useEffect(() => {
        fetchMovies({str: query, filterType: type})
    }, [query, type]);



    return (
        <main className="container content">
            <Search searchMovies={searchMovies} type={type} query={query} />
            {
                loading ? (
                    <Preloader />
                ) : <Movies movies={movies} />
            }
        </main>
    );

}

export { Main }