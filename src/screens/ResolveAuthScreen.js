import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const ResolveAuthScreen = () => {
  const { trySignin } = useContext(AuthContext);
  useEffect(() => {
    trySignin();
  }, [trySignin]);

  return null;
};

export default ResolveAuthScreen;
