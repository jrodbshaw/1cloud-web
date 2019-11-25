import createDataContext from "./CreateDataContext";
import { navigate } from "@reach/router"
// * firebase
import { firebase, db } from '../firebase'

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", user: action.payload };
    case "signin":
      return { errorMessage: "", user: action.payload };
    case "signout":
      return { errorMessage: "", user: null };
    default:
      return state;
  }
};

const useAuth = dispatch => () => {
  console.log('Ran auth')
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      dispatch({ type: "signin", payload: user });
      // * handle  route to account
      navigate('/dashboard')
    } else {
      // * handle route to signin
      navigate('/signup')
    }
  })
};

const signup = dispatch => async (email, password) => {
  console.log("Ran signup")
  try {
    console.log("Awaiting signup")
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log(user)
    dispatch({ type: "signin", payload: user });
  } catch (error) {
    dispatch({ type: 'add_error', payload: { error: true } })
  }
};

const signin = dispatch => async (email, password) => {
  try {
    const { user } = await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: "signin", payload: user })
    // * handle  route to account
    navigate('/dashboard')
  } catch (error) {
    dispatch({ type: 'add_error', payload: { error: true } })
  }
};

const signout = dispatch => async () => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: "signout" });
    // * handle route to signin
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: { error: true }
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, useAuth },
  { user: null, errorMessage: "" }
);
