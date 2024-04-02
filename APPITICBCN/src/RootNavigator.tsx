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
import Noticia from './Noticia';
import Tramits from './Tramits';
import InfoSection from './InfoSection';

const Stack = createStackNavigator();

export default function Root() {
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        detachPreviousScreen: !navigation.isFocused(),
        cardStyleInterpolator,
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <Appbar.Header elevated>
              {back ? (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              ) : (navigation as any).openDrawer ? (
                <Appbar.Action
                  icon="menu"
                  isLeading
                  onPress={() =>
                    (
                      navigation as any as DrawerNavigationProp<{}>
                    ).openDrawer()
                  }
                />
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
        name="Noticia"
        component={Noticia}
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
    </Stack.Navigator>
  );
}