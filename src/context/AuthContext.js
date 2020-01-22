import createDataContext from "./CreateDataContext";
import { navigate } from "@reach/router";
// * firebase
import { firebase, db } from "../firebase";

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
      return { errorMessage: "", user: action.payload };
    case "reset_password":
      return { errorMessage: "", emailSent: action.payload };
    default:
      return state;
  }
};

const trySignin = dispatch => () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: "signin", payload: user });
      // next line means if page refreshed from any where the user is rerouted back to dashboard...
      navigate("/");
    } else {
      dispatch({ type: "signout", payload: null });
      navigate("/signin");
    }
  });
};

const signup = dispatch => async (email, password) => {
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    dispatch({ type: "signin", payload: user });
  } catch (error) {
    dispatch({ type: "add_error", payload: error });
  }
};

const signin = dispatch => async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          uid: firebaseUser.uid
        };
        dispatch({ type: "signin", payload: user });
        db.collection("users")
          .doc(user.uid)
          .set(user, { merge: true });
      } else {
        dispatch({ type: "signin", payload: null });
      }
    });
    // * handle route to account
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: "add_error", payload: error });
  }
};

const signout = dispatch => async () => {
  try {
    await firebase.auth().signOut();
    dispatch({ type: "signout", payload: null });
    // * handle route to signin
    // navigate("/signin");
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: error
    });
  }
};

const resetPassword = dispatch => emailAddress => {
  try {
    firebase.auth().sendPasswordResetEmail(emailAddress);
    // * Email sent.
    dispatch({ type: "reset_password", payload: true });
  } catch (error) {
    dispatch({ type: "add_error", payload: error });
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: "clear_error_message" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, trySignin, clearErrorMessage, resetPassword },
  { user: null, errorMessage: "" }
);
