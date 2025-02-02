// import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store.ts";
import {fetchMoviesSuccess, fetchMoviesFailure, fetchMoviesStart} from "./movieReducer.ts";
// import {IMovie} from "../../types/Types.ts";


// interface IApiResponse {
//     Search?: IMovie[];
//     totalResults?: string;
//     Response: 'True' | 'False';
//     Error?: string;
// }

export const fetchMovies = (query: string, type: string, page: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchMoviesStart());

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&s=${query}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`);
        const data = await response.json();


        if (data.Response === 'True' && data.Search) {
            dispatch(fetchMoviesSuccess({
                movies: data.Search,
                totalResults: parseInt(data.totalResults || '0', 10)}))
        } else {
            dispatch(fetchMoviesFailure(data.Error) || 'Nothing was found.')
        }

    } catch (error) {
        dispatch(fetchMoviesFailure('Network error'));
    }



    // try {
    //
    //     let allMovies: IMovie[] = [];
    //     let page = 1;
    //     let totalResults = 0;
    //
    //     do {
    //         const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&s=${query}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`);
    //         const data: IApiResponse = await response.json();
    //
    //         if (data.Response === "True") {
    //             if (page === 1) {
    //                 totalResults = Math.min(1000, parseInt(data.totalResults || '0', 10));
    //             }
    //             allMovies = [...allMovies, ...data.Search ?? []];
    //
    //
    //             } else {
    //                 break;
    //             }
    //         page++;
    //
    //     } while (allMovies.length < totalResults && page <= 100);
    //
    //     dispatch(fetchMoviesSuccess(allMovies));
    //
    // } catch (error) {
    //     dispatch(fetchMoviesFailure('Network Error'));
    // }
};