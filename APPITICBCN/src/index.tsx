import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProvider } from './context/UserContext';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  InitialState,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useKeepAwake } from 'expo-keep-awake';
import { Provider as PaperProvider } from 'react-native-paper';
import { configureFonts } from 'react-native-paper';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import DrawerItems from './items/DrawerItems';
import App from './RootNavigator';
import { TemaClaro, TemaOscuro } from '../assets/styles/CustomTheme';

interface Fonts {
  [key: string]: any;
}

const customFonts: Fonts = {
  'Outfit': require('../assets/fonts/Outfit-VariableFont_wght.ttf'),
};

interface FontConfig {
  regular: {
    fontFamily: string;
    fontWeight: string;
  };
  medium: {
    fontFamily: string;
    fontWeight: string;
  };
  light: {
    fontFamily: string;
    fontWeight: string;
  };
  thin: {
    fontFamily: string;
    fontWeight: string;
  };
}

const fontConfig = {
  ios: customFonts,
  android: customFonts,
  web: customFonts,
};

interface AppPreferences {
  theme: string;
  themeVersion?: number;
}

const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const PREFERENCES_KEY = 'APP_PREFERENCES';

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...TemaOscuro,
  colors: {
    ...NavigationDarkTheme.colors,
    ...TemaOscuro.colors,
  },
};

const CombinedDefaultTheme = {
  ...NavigationDefaultTheme,
  ...TemaClaro,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...TemaClaro.colors,
  },
};

interface PreferencesContextProps {
  toggleTheme: () => void;
  toggleThemeVersion: () => void;
  toggleCollapsed: () => void;
  toggleCustomFont: () => void;
  toggleRippleEffect: () => void;
  customFontLoaded: boolean;
  rippleEffectEnabled: boolean;
  collapsed: boolean;
  theme: typeof TemaClaro | typeof TemaOscuro;
}

export const PreferencesContext = React.createContext<PreferencesContextProps | null>(null);

const Drawer = createDrawerNavigator<{ Home: undefined }>();

export default function PaperExample() {
  useKeepAwake();

  const [fontsLoaded] = useFonts(customFonts);

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<InitialState>();

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [themeVersion, setThemeVersion] = React.useState<2 | 3>(3);
  const [collapsed, setCollapsed] = React.useState(false);
  const [customFontLoaded, setCustomFont] = React.useState(false);
  const [rippleEffectEnabled, setRippleEffectEnabled] = React.useState(true);

  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleThemeVersion = () => setThemeVersion(prevVersion => (prevVersion === 2 ? 3 : 2));

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        setInitialState(state);
      } catch (e) {
        // handle error
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  React.useEffect(() => {
    const restorePrefs = async () => {
      try {
        const prefString = await AsyncStorage.getItem(PREFERENCES_KEY);
        const preferences = JSON.parse(prefString || '');
        setIsDarkMode(preferences.theme === 'dark');
        setThemeVersion(preferences.themeVersion || 3);
      } catch (e) {
        // handle error
      }
    };

    restorePrefs();
  }, []);

  React.useEffect(() => {
    const savePrefs = async () => {
      try {
        await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify({ theme: isDarkMode ? 'dark' : 'light', themeVersion }));
      } catch (e) {
        // handle error
      }
    };

    savePrefs();
  }, [isDarkMode, themeVersion]);

  const preferences = React.useMemo(() => ({
    toggleTheme: () => setIsDarkMode(!isDarkMode),
    toggleThemeVersion,
    toggleCollapsed: () => setCollapsed(!collapsed),
    toggleCustomFont: () => setCustomFont(!customFontLoaded),
    toggleRippleEffect: () => setRippleEffectEnabled(!rippleEffectEnabled),
    customFontLoaded,
    rippleEffectEnabled,
    collapsed,
    theme,
  }), [isDarkMode, themeVersion, collapsed, customFontLoaded, rippleEffectEnabled, theme]);

  if (!isReady || !fontsLoaded) {
    return null;  // Consider adding a loading indicator here
  }

  return (
    <UserProvider>
      <PaperProvider theme={theme}>
        <PreferencesContext.Provider value={preferences}>
          <NavigationContainer theme={theme} initialState={initialState}>
            <SafeAreaInsetsContext.Consumer>
              {(insets) => {
                const { left = 0, right = 0 } = insets || {};
                const collapsedDrawerWidth = 80 + Math.max(left, right);
                return (
                  <Drawer.Navigator
                    screenOptions={{
                      drawerStyle: {
                        width: collapsed ? collapsedDrawerWidth : undefined,
                      },
                    }}
                    drawerContent={DrawerItems}
                  >
                    <Drawer.Screen name="Home" component={App} options={{ headerShown: false }} />
                  </Drawer.Navigator>
                );
              }}
            </SafeAreaInsetsContext.Consumer>
          </NavigationContainer>
        </PreferencesContext.Provider>
      </PaperProvider>
    </UserProvider>
  );
}
