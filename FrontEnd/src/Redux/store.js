import { createStore } from "redux";
import comReducer from "./rootReducer";


let store = createStore(comReducer);


export default store;