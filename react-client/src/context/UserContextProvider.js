import { createContext, useContext, useState, useRef, useEffect } from "react";
import { User } from "../data/User";
import { Login } from "../data/Login";
import { UserSession } from "../data/UserSession";
import { fetchUser, fetchLogin } from "../service/auth.service";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [joinUser, setJoinUser] = useState(new User());
  const [login, setLogin] = useState(new Login());
  const [error, setError] = useState({});
  const [userSession, setUserSession] = useState(new UserSession());
  const usernameRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const inputRef = { usernameRef, nicknameRef, passwordRef, rePasswordRef };

  const onClickHandler = async () => {
    const result = await fetchLogin(login);
    setUserSession(result);
    document.location.href = "/";
    console.log(userSession);
  };

  const logoutHandler = (e) => {
    fetch(`/user/logout`);
    setUserSession(new UserSession());
    document.location.href = "/";
    console.log(userSession);
  };
  useEffect(() => {
    (async () => {
      const loginUser = await fetchUser();
      if (loginUser) {
        setUserSession(loginUser);
      } else {
        setUserSession(new UserSession());
      }
    })();
    console.log(userSession);
  }, []);

  const props = {
    joinUser,
    setJoinUser,
    inputRef,
    error,
    setError,
    login,
    setLogin,
    userSession,
    setUserSession,
    onClickHandler,
    logoutHandler,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
