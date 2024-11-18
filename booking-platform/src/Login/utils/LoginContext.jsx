import PropTypes from "prop-types";
import { createContext, useContext } from "react";
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const Login = async ({ email, password }) => {
    try {
      const res = await fetch(
        "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/cities/2?includeHotels=true",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };

  return (
    <LoginContext.Provider value={{ Login }}>{children}</LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validates that 'children' is required and a valid React node
};
