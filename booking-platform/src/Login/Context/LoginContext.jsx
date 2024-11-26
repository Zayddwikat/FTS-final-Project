import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const Login = async ({ email, password }) => {
    try {
      const res = await fetch(
        "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: email, password: password }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setUserData(data);
      return data;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };

  return (
    <LoginContext.Provider value={{ Login, userData }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validates that 'children' is required and a valid React node
};
