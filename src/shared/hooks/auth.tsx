import React, { createContext, useCallback, useContext, useState, useMemo } from "react";
import jwtDecode from "jwt-decode";
import { api } from "../../service/api";

interface UserDTO {
  sub: string;
  name: string;
  roles: string[];
}

interface AuthState {
  user: UserDTO;
  tokenCore: string;
}

interface AuthContextDate {
  user: UserDTO;
  tokenCore: string;
  signIn(): Promise<void>;
  signOut(): void;
}

interface AuthLogin {
  token: string;
}

interface TokenProps {
  iss: string;
  sub: string;
  name: string;
  roles: string[];
  iat: number;
  exp: number;
}

const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const persist = localStorage.getItem("persist:root");
    if (persist) {
      const persistParsed = JSON.parse(persist);
      const user = JSON.parse(persistParsed.user);
      const { userInfo } = user;

      if (userInfo) {
        return {
          user: userInfo,
          tokenCore: userInfo.token,
        };
      }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async () => {
    let usuario = {} as UserDTO;
    let tokenCore = "";

    const persist = localStorage.getItem("persist:root");
    if (persist) {
      const persistParsed = JSON.parse(persist);
      const user = JSON.parse(persistParsed.user);
      const { userInfo } = user;

      if (userInfo) {
        const response = await api.post<AuthLogin>("auth/login", {
          token: userInfo.token,
        });

        const { token } = response.data;

        localStorage.setItem("@Dandori: token", token);

        api.defaults.headers.authorization = `Bearer ${token}`;

        const { name, roles, sub }: TokenProps = jwtDecode(token);

        usuario = {
          name,
          roles,
          sub,
        };

        tokenCore = userInfo.token;
      }
    }

    setData({ user: usuario, tokenCore });
  }, []);

  const signOut = useCallback(() => {
    localStorage.setItem("persist:root", "{}");
    setData({} as AuthState);
  }, []);

  const valueAuthContext = useMemo(() => {
    return { user: data.user, signIn, signOut, tokenCore: data.tokenCore };
  }, [data.tokenCore, data.user, signIn, signOut]);

  return <AuthContext.Provider value={valueAuthContext}>{children}</AuthContext.Provider>;
};

function useAuth(): AuthContextDate {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
