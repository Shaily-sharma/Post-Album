import { createStore,applyMiddleware } from "redux";

import roota from "./Main"
import ReduxThunk from "redux-thunk"

const store=createStore(roota,applyMiddleware(ReduxThunk))

export default store;