import React, {  
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postAuthLogin, postAuthRegister } from "./api";
import {
  authStatus,
  type IAuthenticationContext,
  type IAuthenticationStore,
} from "./types";
import { APP_LOGOUT } from "./logout";
import { createCustomContext } from "@/utils";
import { useRouter } from "next/navigation";
import localForage from "@/services/config/localForage.config";

export const [AuthenticationContext, useAuthentication] =
  createCustomContext<IAuthenticationContext>("Authentication Context");

export const AuthenticationProvider = ({children}:{children:React.ReactNode}) => {
  const navigate = useRouter();
  const [status, setStatus] = useState(authStatus.Loading);
  const [authLoading, setAuthLoading] = useState(false);
  const [store, setStore] = useState<IAuthenticationStore>({
    token: localStorage.getItem("auth_token"),
    userId: localStorage.getItem("userId"),
  });

  const isLogged = useRef(!!store.token);

  const login = useCallback(
    (token: string, userId: string, tokenExpiresIn: number, redirect = "") => {
      isLogged.current = true;
      setStore((store) => ({
        ...store,
        token,
        userId,
        tokenExpiresIn,
      }));
      const currentDate = new Date();
      const tokenExpirationDate = new Date(
        currentDate.getTime() + tokenExpiresIn * 1000
      );
      localStorage.setItem("auth_token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem(
        "tokenExpiresAtTimestamp",
        tokenExpirationDate.getTime().toString()
      );
      setStatus(authStatus.SignedIn);
      navigate.push(redirect);
    },
    [navigate]
  );

  const logout = useCallback(() => {
    localStorage.clear();
    localForage.clear();
    isLogged.current = false;
    setStore((store) => ({
      ...store,
      token: null,
    }));
    setStatus(authStatus.SignedOut);
    navigate.push("/sign-in");
  }, [navigate]);

  const authenticate = useCallback(
    async (email: string, password: string) => {
      setAuthLoading(true);
      const result = await postAuthLogin({ email, password });
      if (result) {
        login(result.access_token, result.user_id, result.token_expires_in);
      }
      setAuthLoading(false)
      return;
    },
    [login]
  );

  const register = useCallback(
    async (email: string, password: string) => {
      setAuthLoading(true);

      setAuthLoading(true);
      const result = await postAuthRegister({ email, password });
      if (result) {
        toast.success("E-mail and password registered successfully!");
        authenticate(email, password);        
      }
      setAuthLoading(false)
      return;

    },
    [authenticate]
  );

  const tokenExpired = useCallback(() => {
    const tokenTimestamp = localStorage.getItem("tokenExpiresAtTimestamp");
    if (tokenTimestamp) {
      const date1 = Number(tokenTimestamp);
      const date2 = new Date().getTime();
      return date1 <= date2;
    }
    return true;
  }, []);

  /**
   * Listen to "logout" event and handles it (ie. unauthorized request)
   */
  useEffect(() => {
    window.addEventListener(APP_LOGOUT, () => {
      logout();
    });
    return () => {
      window.removeEventListener(APP_LOGOUT, () => {
        logout();
      });
    };
  }, [logout]);

  useEffect(() => {
    const expired = tokenExpired();

    if (expired) {
      logout();
    } else {
      setStatus(authStatus.SignedIn);
    }
  }, [logout, tokenExpired]);

  const value = useMemo((): IAuthenticationContext => {
    return {
      store,
      isLogged: isLogged.current,
      authLoading,
      logout,
      authenticate,
      register,
    };
  }, [store, logout, authenticate, register, authLoading]);

  if (status === authStatus.Loading) {
    return <>Loading component . . . .</>;
  }

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
