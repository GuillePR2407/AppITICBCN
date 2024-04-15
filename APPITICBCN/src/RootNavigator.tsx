import * as React from 'react';
import { Platform } from 'react-native';

import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';
import Logo from './components/Logo';
import LogoPetit from './components/LogoPetit';

import NewsSection from './Sections/NewsSection';
import Login from './Login';
import NoticiaItem from './items/NoticiaItem';
import TramitsSection from './Sections/TramitsSection';
import InfoSection from './Sections/InfoSection';
import InfoItem from './items/InfoItem';
import TramitsItem from './items/TramitsItem';
import Register from './Register';
import QualificacionsSection from './Sections/QualificacionsSection';

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
          const excludedScreens = ['Login', 'NoticiaItem', 'InfoItem', 'TramitsItem', 'Register'];
          const isExcludedScreen = excludedScreens.includes(route.name);

          return (
            <Appbar.Header style={{
              justifyContent: 'space-between', 
            }}
            elevated>
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
              <Appbar.Content title={title} style={{ 
                position: 'absolute', // Usa posición absoluta para centrar el título
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }} />

              <Appbar.Content 
                title={
                  <LogoPetit />
                }style={{ position: 'absolute', right: 30}}
              />
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
        name="Register"
        component={Register}
        options={{
          title: 'Registre',
      }}/>
      <Stack.Screen
        name="NoticiaItem"
        component={NoticiaItem}
        options={{
          title: 'Noticia',
      }}
      />
      <Stack.Screen
        name="TramitsSection"
        component={TramitsSection}
        options={{
          title: 'Tràmits',
        }}
      />
      <Stack.Screen
        name="TramitsItem"
        component={TramitsItem}
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
      <Stack.Screen
        name="QualificacionsSection"
        component={QualificacionsSection}
        options={{
          title: 'Qualificacions',
        }}
      />
    </Stack.Navigator>
  );
}