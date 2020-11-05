import axios from "axios";

//action const
const GOOGLE_LOGIN = "GOOGLE_LOGIN";

//action creators
const googleLogin = (status) => ({
  type: GOOGLE_LOGIN,
  status,
});

//thunk creators
export const loginWithGoogle = (email) => async (dispatch) => {
  try {
    const status = await axios.get("/auth/google", email);
    dispatch(googleLogin(status));
  } catch (error) {
    console.error("Error trying to login with google >> \n", error);
  }
};
