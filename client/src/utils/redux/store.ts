import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import textReducer from "./textSlice";
import undoable from "redux-undo";

// Combine multiple reducers into a single root reducer
const rootReducer = combineReducers({
   counter: undoable(counterReducer), // only this is undoable
   text: textReducer,
});

// Configure the Redux store
const store = configureStore({
   reducer: rootReducer,
});

export default store;

// Type definitions for TypeScript
export type RootState = ReturnType<typeof rootReducer>; // Type of the root state
export type AppDispatch = typeof store.dispatch; // Type of the dispatch function

/*
Slices:        Containers for reducer logic and actions for a specific feature
Reducers:      Pure functions that take current state and an action, return new state
Actions:       Objects with a type and optional payload that describe state changes
Middleware:    Functions that can intercept and process actions before they reach reducers
Root Reducer:  Combination of all individual reducers in the application
Store:         The central Redux object that holds application state and handles updates
*/
