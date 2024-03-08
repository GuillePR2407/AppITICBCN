import 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import CustomDrawerContent from '@/components/CustomDrawerContent';


const DrawerLayout = () => {
    return <GestureHandlerRootView style={{flex:1}}>
            <Drawer drawerContent={CustomDrawerContent}>
                <Drawer.Screen
                    name="login"
                    options={{
                        drawerLabel: 'Login',
                        drawerIcon: ({ size, color }) => (
                            <MaterialIcons name='login' size={size} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen 
                    name="index" 
                    options={{
                        drawerLabel: 'Home',
                        headerTitle: 'Home',
                        drawerIcon:({size, color}) => (
                            <MaterialIcons name='home' size={size} color={color}/>
                        ),
                    }}
                />
                <Drawer.Screen 
                    name="news" 
                    options={{
                        drawerLabel: 'News',
                        headerTitle: 'News',
                        drawerIcon:({size, color}) => (
                            <MaterialIcons name='newspaper' size={size} color={color}/>
                        ),
                    }}
                />
                <Drawer.Screen 
                    name="profile" 
                    options={{
                        drawerLabel: 'Profile',
                        headerTitle: 'Profile',
                        drawerIcon:({size, color}) => (
                            <MaterialIcons name='account-circle' size={size} color={color}/>
                        ),
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
}

export default DrawerLayout;