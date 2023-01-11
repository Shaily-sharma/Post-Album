import { createStore,applyMiddleware } from "redux";
import { combineReducers } from "redux";
import { datareducer } from "./Redux/Post/reducer";
import { albumreducer } from "./Redux/Album/reducer";

// import roota from "./Main"
import ReduxThunk from "redux-thunk"

const rootb = combineReducers(
    {datareducer,albumreducer}
)

const store=createStore(rootb,applyMiddleware(ReduxThunk))

export default store;