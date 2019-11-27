import createDataContext from "./CreateDataContext";
import { navigate } from "@reach/router"
// * firebase
import { firebase, db } from '../firebase'

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
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

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' })
}

const trySignin = dispatch => () => {
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
  try {
    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
    dispatch({ type: "signin", payload: user });
  } catch (error) {
    dispatch({ type: 'add_error', payload: error })
  }
};

const signin = dispatch => async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    await firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        dispatch({ type: "signin", payload: user })
        db.collection("users")
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        dispatch({ type: "signin", payload: null })
      }
    })
    // * handle  route to account
    navigate('/dashboard')
  } catch (error) {
    console.log(error)
    dispatch({ type: 'add_error', payload: error })
  }
};

const signout = dispatch => async () => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: "signout" });
    // * handle route to signin
    navigate('/signin')
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: error
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, trySignin, clearErrorMessage },
  { user: null, errorMessage: "" }
);
