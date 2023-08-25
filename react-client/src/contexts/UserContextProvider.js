import { createContext, useContext, useState, useRef, useEffect } from "react";
import { User } from "@data/User";
import { Login } from "@data/Login";
import { UserSession } from "@data/UserSession";
import { fetchUser } from "@services/auth.service";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [creater, setCreater] = useState();
  const [modifierOpen, setModifierOpen] = useState(false);
  const [joinUser, setJoinUser] = useState(new User());
  const [login, setLogin] = useState(new Login());
  const [overlap, setOverlap] = useState("");
  const [error, setError] = useState({});
  const [loginError, setLoginError] = useState({});
  const [userSession, setUserSession] = useState(new UserSession());
  const [modal, setModal] = useState({
    subReady: false,
    cancel: false,
  });
  // const [cancel, setCancel] = useState({ });

  const usernameRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const inputRef = { usernameRef, nicknameRef, passwordRef, rePasswordRef };

  // 모달창 열고 닫는 함수
  const modalHandler = () => {
    setModal({ ...modal, subReady: !modal.subReady });
    // console.log(userSession);
  };

  const cancelHandler = () => {
    setModal({ ...modal, cancel: !modal.cancel });
  };

  const logoutHandler = (e) => {
    fetch(`/user/logout`);
    setUserSession(new UserSession());
    document.location.href = "/";
    console.log(userSession);
  };

  // let dataExpireUser;

  useEffect(() => {
    (async () => {
      const loginUser = await fetchUser();
      if (loginUser.username) {
        setUserSession(loginUser);
        console.log("유저 컨텍스트", userSession);
      } else {
        setUserSession(new UserSession());
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const props = {
    joinUser,
    setJoinUser,
    inputRef,
    error,
    setError,
    loginError,
    setLoginError,
    login,
    setLogin,
    overlap,
    setOverlap,
    userSession,
    setUserSession,
    // onClickHandler,
    logoutHandler,
    modal,
    setModal,
    modalHandler,
    // cancel,
    // setCancel,
    cancelHandler,

    creater,
    setCreater,
    modifierOpen,
    setModifierOpen,
  };

  return <UserContext.Provider value={props}>{children}</UserContext.Provider>;
};
