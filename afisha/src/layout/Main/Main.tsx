import {useEffect, useState} from 'react';
import { Movies } from '../../components/Movies/Movies.tsx';
import { Search } from '../../components/Search/Search.tsx';
import {Preloader} from "../../components/Preloader/Preloader.tsx";
import {fetchMovies} from "../../store/reducers/thunk.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import style from './style.module.scss'
import {Pages} from "../../components/Pages/Pages.tsx";

interface IFilterProps {
    str: string;
    filterType: 'all' | 'movie' | 'series' | 'game';
}


const Main = () => {
    // const [movies, setMovies] = useState<IMovie[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    const {movies, loading, totalResults} = useSelector((state: RootState) => state.movies);
    const [type, setType] = useState<'all' | 'movie' | 'series' | 'game'>("all");
    const [query, setQuery] = useState<string>("matrix");
    const [page, setPage] = useState<number>(1);

    const dispatch = useDispatch<AppDispatch>();



    // const fetchMovies = (params: IProps) => {
    //     const {str = 'terminator', filterType = 'all'} = params;
    //     setLoading(true);
    //     fetch(`https://www.omdbapi.com/?apikey=90157240&s=${str}${filterType !== 'all' ? `&type=${filterType}` : ''}`, {})
    //         .then((response) => response.json())
    //         .then((data: IApiResponse) => {
    //             setMovies(data.Search || []);
    //             setLoading(false);
    //         })
    //         .catch((error: IApiResponse) => {
    //             console.log(error);
    //             setLoading(false);
    //         });
    // }

    const searchMovies = ({str, filterType}:IFilterProps) => {
        setQuery(str)
        setType(filterType);
        setPage(1);
        dispatch(fetchMovies(str, filterType, 1))
        // fetchMovies({str, filterType});
    }

    useEffect(() => {
        dispatch(fetchMovies(query, type, page))
        // fetchMovies({str: query, filterType: type})
    }, [query, type, page, dispatch]);

    // console.log(totalResults)
    // console.log(page)
    // console.log(fetchMovies)
    // console.log("Loading state:", loading);
    return (
        <main className={style.mainWrapper}>
            <div>
                <Search searchMovies={searchMovies} type={type} query={query} />
                {
                    loading ? (
                        <Preloader />
                    ) : (
                        <>
                            <Movies movies={movies}/>
                            <Pages page={page} setPage={setPage} loading={loading} totalResults={totalResults} />
                        </>

                    )
                }
            </div>
        </main>
    );

}

export {Main}