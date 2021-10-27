import { createContext, useState } from "react";

export const Context = createContext();

export default function ContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locations, setLocations] = useState([]);

  function changeIsLoggedIn(value) {
    setIsLoggedIn(value);
  }

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        changeIsLoggedIn,
        locations,
        setLocations,
      }}
    >
      {children}
    </Context.Provider>
  );
}
