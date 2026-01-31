import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';

export type ThemeMode = 'light' | 'dark' | 'auto';
export type ColorTheme =
  | 'sky'
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'rose';

interface ThemeContextValue {
  themeMode: ThemeMode;
  colorTheme: ColorTheme;
  setThemeMode: (mode: ThemeMode) => void;
  setColorTheme: (theme: ColorTheme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = 'admin_theme';
const COLOR_THEME_STORAGE_KEY = 'admin_color_theme';

const colorThemes = {
  sky: {
    primary: 'sky',
    gradient: 'from-sky-600 via-sky-700 to-slate-900',
    light: 'sky-50',
    main: 'sky-500',
    dark: 'sky-600',
    darker: 'sky-700',
  },
  blue: {
    primary: 'blue',
    gradient: 'from-blue-600 via-blue-700 to-slate-900',
    light: 'blue-50',
    main: 'blue-500',
    dark: 'blue-600',
    darker: 'blue-700',
  },
  green: {
    primary: 'green',
    gradient: 'from-green-600 via-green-700 to-slate-900',
    light: 'green-50',
    main: 'green-500',
    dark: 'green-600',
    darker: 'green-700',
  },
  purple: {
    primary: 'purple',
    gradient: 'from-purple-600 via-purple-700 to-slate-900',
    light: 'purple-50',
    main: 'purple-500',
    dark: 'purple-600',
    darker: 'purple-700',
  },
  orange: {
    primary: 'orange',
    gradient: 'from-orange-600 via-orange-700 to-slate-900',
    light: 'orange-50',
    main: 'orange-500',
    dark: 'orange-600',
    darker: 'orange-700',
  },
  rose: {
    primary: 'rose',
    gradient: 'from-rose-600 via-rose-700 to-slate-900',
    light: 'rose-50',
    main: 'rose-500',
    dark: 'rose-600',
    darker: 'rose-700',
  },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return (stored as ThemeMode) || 'light';
  });

  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    const stored = window.localStorage.getItem(COLOR_THEME_STORAGE_KEY);
    return (stored as ColorTheme) || 'sky';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateResolvedTheme = () => {
      if (themeMode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setResolvedTheme(prefersDark ? 'dark' : 'light');
      } else {
        setResolvedTheme(themeMode);
      }
    };

    updateResolvedTheme();

    if (themeMode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => updateResolvedTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  }, []);

  const setColorTheme = useCallback((theme: ColorTheme) => {
    setColorThemeState(theme);
    window.localStorage.setItem(COLOR_THEME_STORAGE_KEY, theme);
  }, []);

  const value: ThemeContextValue = {
    themeMode,
    colorTheme,
    setThemeMode,
    setColorTheme,
    resolvedTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export { colorThemes };
