import 'react-native-gesture-handler'
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomDrawerContent from '@/components/CustomDrawerContent';

const DrawerLayout = () => {
    return <GestureHandlerRootView style={{flex:1}}>
            <Drawer drawerContent={CustomDrawerContent} screenOptions={{
                drawerActiveBackgroundColor: '#30efbc',
                drawerActiveTintColor: '#1D1B20',
                drawerLabelStyle: { marginLeft: -20}
            }}>
                <Drawer.Screen 
                    name="login" 
                    options={{
                        headerShown: false,
                        drawerLabel: 'Login',
                        headerTitle: 'Login',
                        drawerItemStyle: {
                            backgroundColor: '#2F29A1',
                        },
                        drawerLabelStyle:{
                            color: '#',
                        },
                        drawerIcon:({size}) => (
                            <MaterialCommunityIcons name='login' size={size} color={'#CAC4D0'}/>
                        ),
                    }}
                />
                <Drawer.Screen 
                    name="index" 
                    options={{
                        drawerLabel: 'Home',
                        headerTitle: 'Home',
                        drawerIcon:({size, color}) => (
                            <MaterialCommunityIcons name='home-outline' size={size} color={color}/>
                        ),
                    }}
                />
                <Drawer.Screen 
                    name="tramits" 
                    options={{
                        drawerLabel: 'Tràmits',
                        headerTitle: 'Tràmits',
                        drawerIcon:({size, color}) => (
                            <MaterialCommunityIcons name='file-outline' size={size} color={color}/>
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