// import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../store.ts";
import {fetchMoviesSuccess, fetchMoviesFailure, fetchMoviesStart} from "./movieReducer.ts";

export const fetchMovies = (query: string, type: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchMoviesStart());
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&s=${query}${type !== 'all' ? `&type=${type}` : ''}`);
        const data = await response.json();
        if (data.Response === "True") {
            dispatch(fetchMoviesSuccess(data.Search || []));
        } else {
            dispatch(fetchMoviesSuccess([]));
            dispatch(fetchMoviesFailure(data.Error || 'Something went wrong'));
        }
    } catch (error) {
        dispatch(fetchMoviesFailure('Network Error'));
    }
}