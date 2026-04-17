import { createContext, useContext, useEffect, useState } from "react";
import { AuthState } from "../types/auth";
import { getAuth, saveAuth, clearAuth } from "../services/authStorage";
import { User } from "../types/user";

interface AuthContextType extends AuthState {
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>; // ✅ ADD
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuth();
  }, []);

  const loadAuth = async () => {
    const { user, token } = await getAuth();

    setAuth({
      user,
      token,
      isAuthenticated: !!token,
    });

    setLoading(false);
  };

  const login = async (user: User, token: string) => {
    await saveAuth(user, token);

    setAuth({
      user,
      token,
      isAuthenticated: true,
    });
  };

  const logout = async () => {
    await clearAuth();

    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  // 🔥 NEW: UPDATE USER
  const updateUser = async (data: Partial<User>) => {
    if (!auth.user || !auth.token) return;

    const updatedUser: User = {
      ...auth.user,
      ...data,
    };

    // save updated user to storage
    await saveAuth(updatedUser, auth.token);

    // update state
    setAuth((prev) => ({
      ...prev,
      user: updatedUser,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        updateUser, // ✅ ADD HERE
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);