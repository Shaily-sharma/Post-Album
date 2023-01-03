import { combineReducers } from "redux";
import { datareducer } from "./components/Page/Redux/reducers/Reducer";
import { albumreducer } from "./components/albums/reducerss/reducer";

const roota = combineReducers(
    {datareducer,albumreducer}
)

export default roota;