import { combineReducers } from "redux";
import { datareducer } from "./Redux/Post/reducers/Reducer";
import { albumreducer } from "./Redux/Album/reducers/reducer";

const roota = combineReducers(
    {datareducer,albumreducer}
)

export default roota;