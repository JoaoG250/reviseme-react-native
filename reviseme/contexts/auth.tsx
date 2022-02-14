import api from "../api";
import axios, { AxiosResponse } from "axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

import { useContext, useEffect } from "react";
import { User } from "../interfaces/User";
import { createContext, useState } from "react";
import { getUserInfo, login } from "../services/auth";

interface SignInData {
  email: string;
  password: string;
}

interface AuthContextType {
  loading: boolean;
  user: User | undefined;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<AxiosResponse>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function loadStorage() {
      const token = await AsyncStorageLib.getItem("@reviseme:token");

      if (token) {
        await getUser();
      }
      setLoading(false);
    }

    loadStorage();
  }, []);

  async function getUser() {
    try {
      const response = await getUserInfo();
      setUser(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await signOut();
        } else {
          throw error;
        }
      } else {
        throw error;
      }
    }
  }

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await login(email, password);
      const token = response.data.authToken;

      // Set token
      api.defaults.headers.common["Authorization"] = `Token ${token}`;

      // Get user
      await getUser();

      // Save token
      await AsyncStorageLib.setItem("@reviseme:token", token);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If the error is a AxiosError, then we can get the response
        if (error.response && error.response.status === 400) {
          // If we have a response and the error is Bad Request, then we return the response
          return error.response;
        }
        throw error;
      }
      throw error;
    }
  }

  async function signOut() {
    await AsyncStorageLib.removeItem("@reviseme:token");
    setUser(undefined);
  }

  return (
    <AuthContext.Provider
      value={{ loading, user, isAuthenticated, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
