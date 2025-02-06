import { IMovieDetails } from "../../types/Types.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";



export const fetchMovies = createAsyncThunk(
    "movies/fetchMovies",
    async ({ query, type, page, append }: { query: string; type: string; page: number; append: boolean }, { rejectWithValue })  => {

        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&s=${query}${type !== 'all' ? `&type=${type}` : ''}&page=${page}`);
            const data = await response.json();


            if (data.Response === 'True' && data.Search) {
                return {
                    movies: data.Search,
                    totalResults: parseInt(data.totalResults || '0', 10),
                    append,
                };

            } else {
                return rejectWithValue(data.Error || 'Nothing was found.');
            }

        } catch (error) {
            return rejectWithValue('Network error');
        }
    }
);

export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=90157240&i=${id}&plot=short`);
            const data:{Response: string, Plot?: string, imdbRating?: string, Rated?: string, Error?: string} = await response.json();

            if (data.Response === 'True') {
                const movieDetails: IMovieDetails ={
                    Plot: data.Plot || '',
                    imdbRating: data.imdbRating || '',
                    Rated: data.Rated,
                };
                return {id, details: movieDetails};
            } else {
                return rejectWithValue("Error fetching details");
            }
        } catch (error) {
            return rejectWithValue("Network error");
        }
    }
)
