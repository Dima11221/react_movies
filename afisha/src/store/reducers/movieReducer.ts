import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from "../../types/Types.ts";
// import {fetchMovies} from "./thunk.ts";

interface MovieState {
    movies: IMovie[];
    loading: boolean;
    error: string | null;
}

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: null,
};


const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        fetchMoviesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMoviesSuccess: (state, action: PayloadAction<IMovie[]>) => {
            state.loading = false;
            state.movies = action.payload;
        },
        fetchMoviesFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.movies = [];
            state.error = action.payload;
        }
    },

});

// const movieSlice = createSlice({
//     name: 'movies',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchMovies.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchMovies.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.movies = action.payload;
//             })
//             .addCase(fetchMovies.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             })
//     }
//
//
// });

export const {fetchMoviesStart, fetchMoviesSuccess, fetchMoviesFailure} = movieSlice.actions;
export const movieReducer = movieSlice.reducer;
