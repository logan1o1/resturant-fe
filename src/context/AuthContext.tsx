import React, { createContext, useContext } from "react";


export type AuthToken = {
  authToken: string | null;
  signin: (c: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<AuthToken>({
  authToken: null,
  signin: () => { },
  signout: () => { }
})

export const useAuthContext = () => useContext(AuthContext)

