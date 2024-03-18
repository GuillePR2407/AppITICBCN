import * as React from 'react';
import { I18nManager, StyleSheet, View, Platform } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {
  Badge,
  Drawer,
  MD2Colors,
  MD3Colors,
  Switch,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import { PreferencesContext, useExampleTheme } from './index';
<<<<<<< HEAD
=======
import { Background } from '@react-navigation/elements';

>>>>>>> 6795bf81b57e47b9e3a6536e2456d8c1ff5f57ba
const isWeb = Platform.OS === 'web';

const DrawerItemsData = [
  {
    label: 'Login',
    icon: 'login',
    key: -1,
  },
  {
    label: 'Notícies',
    icon: 'newspaper',
    key: 0,
  },
  {
    label: 'Tramits',
    icon: 'file-edit',
    key: 1,
  },
  { 
    label: 'Informació', 
    icon: 'send', 
    key: 2 
  },
];

<<<<<<< HEAD
=======
const DrawerCollapsedItemsData = [
  {
    label: 'login',
    focusedIcon: 'login',
    unfocusedIcon: 'login-outline',
    key: -1,
  },
  {
    label: 'noticias',
    focusedIcon: 'newspaper',
    unfocusedIcon: 'newspaper-outline',
    key: 0,
  },
  {
    label: 'tramits',
    focusedIcon: 'file-edit',
    unfocusedIcon: 'file-edit-outline',
    key: 1,
  },
  {
    label: 'informació',
    focusedIcon: 'send',
    unfocusedIcon: 'send-outline',
    key: 2,
  },
];

>>>>>>> 6795bf81b57e47b9e3a6536e2456d8c1ff5f57ba
function DrawerItems() {

  const navigation = useNavigation();

  const [drawerItemIndex, setDrawerItemIndex] = React.useState<number>(0);
  const preferences = React.useContext(PreferencesContext);

  const _setDrawerItem = (index: number) => setDrawerItemIndex(index);

  const { isV3, colors } = useExampleTheme();

  if (!preferences) throw new Error('PreferencesContext not provided');

  const {
    toggleTheme,
    toggleCollapsed,
    collapsed,
    theme: { dark: isDarkTheme },
  } = preferences;

  const coloredLabelTheme = {
    colors: isV3
      ? {
          secondaryContainer: MD3Colors.tertiary80,
          onSecondaryContainer: MD3Colors.tertiary20,
        }
      : {
          primary: MD2Colors.tealA200,
        },
  };

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
      <Drawer.Section style={{ paddingTop: 10 }}>
          <Drawer.Item
            label="Login"
            icon="login"
            active={drawerItemIndex === -1} 
<<<<<<< HEAD
            onPress={() => navigation.navigate('login')}
            
=======
            onPress={() => _setDrawerItem(-1)}
>>>>>>> 6795bf81b57e47b9e3a6536e2456d8c1ff5f57ba
            style={{ backgroundColor: '#2F29A1' }}
            theme={{colors: { 
            onSecondaryContainer: '#CAC4D0',
            onSurfaceVariant: '#CAC4D0', }}}
          />
      </Drawer.Section>

      {!collapsed && (
        <>
          <Drawer.Section title="Recursos Generals">
            {DrawerItemsData.filter(item => item.key !== -1).map((props, index) => (
              <Drawer.Item
                {...props}
                key={props.key}
                theme={props.key === 3 ? coloredLabelTheme : undefined}
                active={drawerItemIndex === index}
                onPress={() => _setDrawerItem(index)}
              />
            ))}
          </Drawer.Section>
<<<<<<< HEAD
          <Drawer.Section>
              <TouchableRipple onPress={toggleTheme}>
                <View style={[styles.preference, isV3 && styles.v3Preference]}>
                  <Text variant="labelLarge">Dark Theme</Text>
                  <View pointerEvents="none">
                    <Switch value={isDarkTheme} />
                  </View>
                </View>
              </TouchableRipple>
            </Drawer.Section>
          </>
=======
          {/* Resto del contenido como el Switch para el tema oscuro */}
        </>
>>>>>>> 6795bf81b57e47b9e3a6536e2456d8c1ff5f57ba
      )}
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