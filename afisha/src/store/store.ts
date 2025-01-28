import { configureStore } from '@reduxjs/toolkit';
// import { movieReducer } from "./reducers/movieReducer.ts";
import {thunk} from "redux-thunk";
import { rootReducer } from "./reducers/rootReducer.ts";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
