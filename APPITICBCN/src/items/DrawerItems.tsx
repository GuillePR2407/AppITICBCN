import React, { useState, useEffect } from 'react';
import { I18nManager, Image, StyleSheet, View, Platform } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../RootStackParamList';
import { useUser } from '../UserContext';
import {
  Badge,
  Drawer,
  MD2Colors,
  MD3Colors,
  Switch,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { PreferencesContext } from '../index';
const isWeb = Platform.OS === 'web';

import userData from "../data/userData.json"


const GeneralResources = [
  { label: 'Notícies', icon: 'newspaper', key: 0, routeName: 'NewsSection' },
  { label: 'Tramits',icon: 'file-edit',key: 1,routeName: 'TramitsSection' },
  { label: 'Informació', icon: 'information-outline', key: 2, routeName: 'InfoSection' },
];

const AdministratorResources = [
  { label: 'Afegir usuaris', icon: 'account-plus-outline', key: 1, routeName: 'AddUsersSection' },
  { label: 'Llista d\'usuaris', icon: 'account-multiple-outline', key: 2, routeName: 'UsersSection' },
];

const AcademicResourcesData = [
  { label: 'Qualificacions', icon: 'clipboard-check-outline', key: 3, routeName: 'QualificacionsSection' },
  { label: 'Mòduls', icon: 'format-list-bulleted', key: 4, routeName: 'ModulsSection' },
  { label: 'Horari', icon: 'calendar-month-outline', key: 5, routeName: 'HorariSection' },
  { label: 'Bloc de notes', icon: 'note-text-outline', key: 6, routeName: 'NotepadSection' },
  { label: 'Xat', icon: 'message-text-outline', key: 7, routeName: 'ChatSection' },
];

function DrawerItems() {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [drawerItemIndex, setDrawerItemIndex] = useState<number>(0);
  const preferences = React.useContext(PreferencesContext);
  const { theme } = React.useContext(PreferencesContext);

  const _setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const { userRole } = useUser();

  let currentUserId;

  if (userRole === 2) {
    currentUserId = "2";
  } else if (userRole === 3){
    currentUserId = "3";
  } else if (userRole === 4){
    currentUserId = "4";
  } else {
    currentUserId = "1";
  }
  const currentUser = userData.find(user => user.id === currentUserId);

  const [isUserLoggedIn, setIsUserLoggedIn] = userRole === 1? useState(false) : useState(true);

  useEffect(() => {
    setIsUserLoggedIn(userRole > 1);
  }, [userRole]);

  const { colors } = theme;

  const getAcademicResources = () => {
    switch(userRole) {
      case 2: // Alumno
        return AcademicResourcesData.filter(item => item.key !== 4); 
      case 3: // Profesor
        return AcademicResourcesData.filter(item => item.key !== 3);  
      default:
        return []; // No mostrar para otros roles
    }
  };

  const academicResources = getAcademicResources();

  const {
    toggleTheme,
    toggleCollapsed,
    collapsed,
    theme: { dark: isDarkTheme },
  } = preferences;

  const coloredLabelTheme = {
          secondaryContainer: MD3Colors.tertiary80,
          onSecondaryContainer: MD3Colors.tertiary20,
          primary: MD2Colors.tealA200,
  }

  const UserHeader = () => {
    const { role, name, course, imageUrl } = currentUser || {};

    return (
      <View style={styles2.userHeader}>
        <Image source={{ uri: imageUrl }} style={styles2.userImage} />
        <View>
          <Text>{name}</Text>
          <Text>{course}</Text>
        </View>
      </View>
    );
  };
  const styles2 = StyleSheet.create({
    userHeader: {
      flexDirection: 'row',
      padding: 16,
      alignItems: 'center',
    },
    userImage: {
      width: 50,
      height: 50,
      marginRight: 16,
      marginLeft: 16,
      borderRadius: 25,
    },

  });

  return (
    <DrawerContentScrollView
      alwaysBounceVertical={false}
      style={[
        styles.drawerContent,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      {!isUserLoggedIn && (
        <Drawer.Section style={{ paddingTop: 10 }}>
          <Drawer.Item
            label="Login"
            icon="login"
            active={drawerItemIndex === -1} 
            onPress={() => {
              setDrawerItemIndex(-1);
              navigation.navigate('Login');
            }}
            style={{ backgroundColor: '#2F29A1' }}
            theme={{colors: { 
            onSecondaryContainer: '#CAC4D0',
            onSurfaceVariant: '#CAC4D0', }}}
          />
        </Drawer.Section>
      )}
      {isUserLoggedIn && (
        <Drawer.Section>
          <UserHeader />
        </Drawer.Section>
      )}

      {userRole === 4 && (
        <Drawer.Section title="Tablero de Administrador">
          {AdministratorResources.map((item) => (
            <Drawer.Item
              key={item.key}
              icon={item.icon}
              label={item.label}
              theme={coloredLabelTheme}
              active={drawerItemIndex === item.key}
              onPress={() => {
                setDrawerItemIndex(item.key);
                navigation.navigate(item.routeName as keyof RootStackParamList);
              }}
              
            />
          ))}
        </Drawer.Section>
      )}

      {userRole !== 4 && !collapsed &&  (
        <>
          <Drawer.Section title="Recursos Generals">
            {GeneralResources.filter(item => item.key !== -1).map((props, index) => (
              <Drawer.Item
                {...props}
                key={props.key}
                theme={props.key === 3 ? coloredLabelTheme : undefined}
                active={drawerItemIndex === index}
                onPress={() => {
                  _setDrawerItem(index)
                  const { routeName } = props;
                  navigation.navigate(routeName as keyof RootStackParamList)
                }}
              />
            ))}
          </Drawer.Section>
          {academicResources.length > 0 && (
            <Drawer.Section title="Espai Acadèmic">
              {academicResources.map((item) => (
                <Drawer.Item
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  active={drawerItemIndex === item.key}
                  onPress={() => {
                    setDrawerItemIndex(item.key);
                    navigation.navigate(item.routeName as keyof RootStackParamList);
                  }}
                />
              ))}
            </Drawer.Section>
          )}
          
        </>
      )}

      <Drawer.Section>
        <TouchableRipple onPress={toggleTheme}>
          <View style={[styles.preference, styles.v3Preference]}>
            <Text variant="labelLarge">Dark Theme</Text>
            <View pointerEvents="none">
              <Switch value={isDarkTheme} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}


const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  v3Preference: {
    height: 56,
    paddingHorizontal: 28,
  },
  badge: {
    alignSelf: 'center',
  },
  collapsedSection: {
    marginTop: 16,
  },
  annotation: {
    marginHorizontal: 24,
    marginVertical: 6,
  },
});

export default DrawerItems;