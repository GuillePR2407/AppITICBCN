import * as React from 'react';
import { Platform } from 'react-native';

import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { getHeaderTitle } from '@react-navigation/elements';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Appbar } from 'react-native-paper';

// Asegúrate de importar NewsSection desde su ubicación correcta
import NewsSection from './NewsSection'; // Asumiendo que NewsSection está en el mismo directorio

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
          title: 'Noticias', // Ajusta el título según necesites
        }}
      />
      {/* Removido el mapeo de examples, centrando la navegación solo en la sección de noticias */}
    </Stack.Navigator>
  );
}