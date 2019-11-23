import createDataContext from "./CreateDataContext";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", user: action.payload };
    default:
      return state;
  }
};

const signup = dispatch => async ({ email, password }) => {
  // * create user with email & password
  // * save user to firestore
  // * add either user or a user ID to context
  // * if signup fails handle error
};

const signin = dispatch => ({ email, password }) => {
  //* make request to signin
  //* if we sign in, update state
  //* if signin fails handle error
};

const signout = dispatch => () => {
  //* make request to signout
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { user: null, errorMessage: "" }
);
