import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
/*
Thunk: Middleware for Redux that allows you to write action creators that
return a function instead of an action object. This function can then
dispatch multiple actions asyncronously.
*/
import thunk from "redux-thunk";
// TODO: Import reducer files

/*
const reducers = combineReducers({
    auth: authReducer,
    user: userReducer,
    app: appReducer,
});

const store = configureStore({
    reducer: reducers,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
*/
