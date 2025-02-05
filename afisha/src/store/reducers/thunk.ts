// import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store.ts";
import {fetchMoviesSuccess, fetchMoviesFailure, fetchMoviesStart, setMovieDetails} from "./movieReducer.ts";
// import {IMovie} from "../../types/Types.ts";
import {IMovieDetails} from "../../components/Movie/Movie.tsx";
// import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchMovies = (query: string, type: string, page: number, append = false ) => async (dispatch: AppDispatch) => {
    dispatch(fetchMoviesStart());

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&s=${query}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`);
        const data = await response.json();


        if (data.Response === 'True' && data.Search) {
            dispatch(fetchMoviesSuccess({
                movies: data.Search,
                totalResults: parseInt(data.totalResults || '0', 10),
                append,
            }));

        } else {
            dispatch(fetchMoviesFailure(data.Error) || 'Nothing was found.')
        }

    } catch (error) {
        dispatch(fetchMoviesFailure('Network error'));
    }

};

export const fetchMovieDetails = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&i=${id}&plot=short`);
        const data:{Response: string, Plot?: string, imdbRating?: string, Rated?: string, Error?: string} = await response.json();

        if (data.Response === 'True') {
            const movieDetails: IMovieDetails ={
                Plot: data.Plot || '',
                imdbRating: data.imdbRating || '',
                Rated: data.Rated,
            };
            dispatch(setMovieDetails({id, details: movieDetails}));
        } else {
            // dispatch(setMovieDetails('Error fetching details'));
            dispatch(setMovieDetails({id, details: null}));
        }
    } catch (error) {
        // dispatch(setMovieDetails('Network error'));
        dispatch(setMovieDetails({id, details: null}))
    }
}

// export const fetchMovieDetails = createAsyncThunk(
//     'movies/fetchMovieDetails',
//     async (id: string, {dispatch}) => {
//         try {
//             const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&i=${id}&plot=short`);
//             const data:{Response: string, Plot?: string, imdbRating?: string, Error?: string} = await response.json();
//
//             if (data.Response === 'True') {
//                 const movieDetails: IMovieDetails ={
//                     Plot: data.Plot || '',
//                     imdbRating: data.imdbRating || '',
//                 };
//                 dispatch(setMovieDetails({id, details: movieDetails}));
//             } else {
//                 // dispatch(setMovieDetails('Error fetching details'));
//                 dispatch(setMovieDetails({id, details: null}));
//             }
//         } catch (error) {
//             // dispatch(setMovieDetails('Network error'));
//             dispatch(setMovieDetails({id, details: null}))
//         }
//     });

