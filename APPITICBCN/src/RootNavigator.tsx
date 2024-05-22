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

import { useUser } from './context/UserContext';

import NewsSection from './Sections/NewsSection';
import Login from './Login';
import NoticiaItem from './items/NoticiaItem';
import TramitsSection from './Sections/TramitsSection';
import InfoSection from './Sections/InfoSection';
import InfoItem from './items/InfoItem';
import TramitsItem from './items/TramitsItem';
import Register from './Register';
import QualificacionsSection from './Sections/QualificacionsSection';
import AddUsersSection from './Sections/AddUsersSection';
import UsersSection from './Sections/UsersSection';
import AlumSection from './Sections/AlumSection';

const Stack = createStackNavigator();

export default function Root() {
  const cardStyleInterpolator =
    Platform.OS === 'android'
      ? CardStyleInterpolators.forFadeFromBottomAndroid
      : CardStyleInterpolators.forHorizontalIOS;

  const { userRole, setUserRole } = useUser(); 

  const initialRouteName = userRole === 4 ? 'AddUsersSection' : 'NewsSection'; 

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={({ navigation, route }) => ({
        detachPreviousScreen: !navigation.isFocused(),
        cardStyleInterpolator,
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          const excludedScreens = ['Login', 'NoticiaItem', 'InfoItem', 'TramitsItem', 'Register'];
          const isExcludedScreen = excludedScreens.includes(route.name);
          return (
            <Appbar.Header style={{ justifyContent: 'space-between' }} elevated>
              {!isExcludedScreen && (navigation as any).openDrawer ? (
                <Appbar.Action
                  icon="menu"
                  isLeading
                  onPress={() => (navigation as any as DrawerNavigationProp<{}>).openDrawer()}
                />
              ) : back ? (
                <Appbar.BackAction onPress={() => navigation.goBack()} />
              ) : null}
              <Appbar.Content title={title} style={{ position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }} />
            </Appbar.Header>
          );
        },
      })}
    >
      {userRole === 4 ? ( 
        <Stack.Screen name="AddUsersSection" component={AddUsersSection} 
        options={{
          title: 'Afegir usuaris',
        }} />
      ) : (
        <Stack.Screen name="NewsSection" component={NewsSection} 
        options={{
          title: 'Noticies',
        }} />)}
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
      <Stack.Screen
        name="UsersSection"
        component={UsersSection}
        options={{
          title: 'Usuaris',
        }}
      />
      <Stack.Screen
        name="AlumSection"
        component={AlumSection}
        options={{
          title: 'Alumnes',
        }}
      />

    </Stack.Navigator>
  );
}