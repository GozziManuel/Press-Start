import { createContext, useContext, useState } from "react";
const UserContext = createContext();
function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [hiddenPass, setHiddenPass] = useState(true);

  const token = localStorage.getItem("token");

  const handleHiddenPass = () => {
    setHiddenPass(!hiddenPass);
  };

  const setterUser = (valori) => {
    setUserInfo(valori);
  };

  const setterLogged = () => {
    setIsLogged(!isLogged);
  };

  const values = {
    userInfo,
    setterUser,
    setterLogged,
    isLogged,
    handleHiddenPass,
    hiddenPass,
    setIsLogged,
    token,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
