import axios from "axios";

//action constants
const LOGIN = "LOGIN";

//action creators
const login = (user) => ({
  type: LOGIN,
  user,
});

//thunk creators
export const tryLogin = (userCreds) => async (dispatch) => {
  try {
    const user = await axios.put("/api/login", userCreds);
    dispatch(login(user));
  } catch (error) {
    console.error("!! Error trying to login user >> ", error);
  }
};

export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    default:
      return state;
  }
};
