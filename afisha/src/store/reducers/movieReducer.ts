import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from "../../types/Types.ts";

interface MovieState {
    movies: IMovie[];
    loading: boolean;
    error: string | null;
    totalResults: number;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
    totalResults: 0,
};


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMoviesSuccess: (state, action: PayloadAction<{ movies: IMovie[], totalResults: number }>) => {
            state.loading = false;
            state.movies = action.payload.movies;
            state.totalResults = action.payload.totalResults;
        },
        fetchMoviesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.movies = [];
            state.totalResults = 0;
            state.error = action.payload;
        }
    },

});


export const {fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure} = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
