import { combineReducers } from "redux";
import userReducer from "./user";

const appReducer = combineReducers({ user: userReducer });

const initialState = {};

export default appReducer;
// export default reducer = (state = initialState, action) => {
//   switch (action.type) {
//     default:
//       return state;
//   }
// };

//use react-redux connect here to combine reducers into one and export
