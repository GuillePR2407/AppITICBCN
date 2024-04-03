import * as React from 'react';
import { Platform } from 'react-native';

import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';

import NewsSection from './NewsSection';
import Login from './Login';
import NoticiaItem from './NoticiaItem';
import Tramits from './Tramits';
import InfoSection from './InfoSection';
import InfoItem from './InfoItem';

const Stack = createStackNavigator();

export default function Root() {
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;

  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        detachPreviousScreen: !navigation.isFocused(),
        cardStyleInterpolator,
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          // Comprueba si la pantalla actual es 'Login'
          const excludedScreens = ['Login', 'NoticiaItem', 'InfoItem'];
          const isExcludedScreen = excludedScreens.includes(route.name);

          return (
            <Appbar.Header elevated>
              {!isExcludedScreen && (navigation as any).openDrawer ? (
                // Muestra el botón del menú para todas las pantallas excepto Login
                <Appbar.Action
                  icon="menu"
                  isLeading
                  onPress={() =>
                    (
                      navigation as any as DrawerNavigationProp<{}>
                    ).openDrawer()
                  }
                />
              ) : back ? (
                // Muestra el botón de volver solo en la pantalla de Login
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              ) : null}
              <Appbar.Content title={title} />
            </Appbar.Header>
          );
        },
      })}
    >
      {/* Cambiado de ExampleList a NewsSection */}
      <Stack.Screen
        name="NewsSection"
        component={NewsSection}
        options={{
          title: 'Noticias',
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
      }}/>
      <Stack.Screen
        name="NoticiaItem"
        component={NoticiaItem}
        options={{
          title: 'Noticia',
        }}
      />
      <Stack.Screen
        name="Tràmits"
        component={Tramits}
        options={{
          title: 'Tràmits',
        }}
      />
      <Stack.Screen
        name="InfoSection"
        component={InfoSection}
        options={{
          title: 'Informació',
        }}
      />
      <Stack.Screen
        name="InfoItem"
        component={InfoItem}
        options={{
          title: 'Informació',
        }}
      />
    </Stack.Navigator>
  );
}