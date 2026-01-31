import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from 'react';
import { adminLogin, adminLogout, AdminUser } from '../services/api';

interface AuthState {
  token: string | null;
  user: AdminUser | null;
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, captcha: string, remember: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const STORAGE_KEY = 'admin_auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    token: null,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthState;
        if (parsed.token && parsed.user) {
          setState(parsed);
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persistState = useCallback((nextState: AuthState, remember: boolean) => {
    if (remember) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string, captcha: string, remember: boolean) => {
      const result = await adminLogin(email, password, captcha);
      if (!result.token || !result.data) {
        throw new Error('Invalid response from server');
      }
      const nextState: AuthState = {
        token: result.token,
        user: result.data,
      };
      setState(nextState);
      persistState(nextState, remember);
    },
    [persistState]
  );

  const logout = useCallback(async () => {
    const currentToken = state.token ?? undefined;
    setState({ token: null, user: null });
    window.localStorage.removeItem(STORAGE_KEY);
    await adminLogout(currentToken);
  }, [state.token]);

  const value = useMemo<AuthContextValue>(
    () => ({
      token: state.token,
      user: state.user,
      isAuthenticated: Boolean(state.token && state.user),
      loading,
      login,
      logout,
    }),
    [state.token, state.user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}


