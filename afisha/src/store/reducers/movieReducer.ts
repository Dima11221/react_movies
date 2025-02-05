import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from "../../types/Types.ts";
import { IMovieDetails } from "../../types/Types.ts";

interface MovieState {
    movies: IMovie[];
    movieDetails: Record<string, IMovieDetails | null>;
    loading: boolean;
    error: string | null;
    totalResults: number;
}

const initialState: MovieState = {
    movies: [],
    movieDetails: {},
    loading: false,
    error: null,
    totalResults: 0,

};

// interface IMovieDetails {
//     Plot?: string;
//     imdbRating?: string
//     Rated?: string
// }

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMoviesSuccess: (state, action: PayloadAction<{ movies: IMovie[], totalResults: number, append: boolean }>) => {
            state.loading = false;
            state.movies = action.payload.movies;
            state.totalResults = action.payload.totalResults;

            if (action.payload.append) {
                state.movies = [...state.movies, ...action.payload.movies];
            } else {
                state.movies = action.payload.movies;
            }
        },
        fetchMoviesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.movies = [];
            state.totalResults = 0;
            state.error = action.payload;
        },
        setMovieDetails: (state, action: PayloadAction<{ id: string, details: IMovieDetails | null }>) => {
            const { id, details } = action.payload;
            state.movieDetails[id] = details;
        }

    },

});


export const {fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure, setMovieDetails} = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
