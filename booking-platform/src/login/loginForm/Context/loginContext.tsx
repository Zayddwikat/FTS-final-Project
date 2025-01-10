import React, { createContext, ReactNode, useContext, useState } from "react";

interface LoginContextProp {
  Login: (params: { email: string; password: string }) => Promise<any>;
  userData: object;
}

export const LoginContext = createContext<LoginContextProp | undefined>(
  undefined
);

export const LoginProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState({});
  const Login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
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
    } catch (error: any) {
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
