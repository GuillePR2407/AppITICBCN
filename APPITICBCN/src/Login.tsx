import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import Logo from './components/Logo';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';
import { loginUser, fetchUserRole } from './services/authService';
import { PreferencesContext } from './index';
import { useUser } from './UserContext';

const Login = () => {
    type NewsNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

    const navigation = useNavigation<NewsNavigationProp>();
    const { theme } = useContext(PreferencesContext);

    const [checked, setChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUserRole } = useUser();

    const handleLogin = async () => {
        try {
            await loginUser(email, password);
            console.log('Logged in');

            // Aquí llamas a fetchUserRole y actualizas el contexto
            const role = await fetchUserRole(email);
            if (role) {
                setUserRole(role); // Actualizar el contexto con el nuevo rol
                console.log('User role set to:', role);
            } else {
                setUserRole(2);
            }

            navigation.navigate('NewsSection');

            // Redirigir al usuario o realizar otras acciones
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <Logo />
                <TextInput
                    theme={{ colors: { primary: theme.colors.primary }}}  
                    style={{ marginTop: 20, marginBottom: 20 }}
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    mode="outlined"
                />
                <TextInput  
                    theme={{ colors: { primary: theme.colors.primary }}} 
                    style={{ marginTop: 20 }} 
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    mode="outlined"
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <Checkbox
                        theme={{ colors: { primary: theme.colors.primary }}}  
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                    />
                    <Text onPress={() => setChecked(!checked)} style={{ marginLeft: 8 }}>
                        Remember me
                    </Text>
                </View>
                <Button 
                    mode="contained" 
                    onPress={handleLogin}
                    labelStyle={{ color: theme.colors.onDoneButton, fontSize: 20 }}
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        borderRadius: 30,
                        height: '10%',
                        justifyContent: 'center',
                        width: '60%',
                        alignSelf: 'center',
                        backgroundColor: theme.colors.doneButton,
                    }}
                >
                    Login
                </Button>
                <Text style={{ alignSelf: 'center', fontSize: 18 }} onPress={navigateToRegister}>
                    ¡Regístrate!
                </Text>
            </View>
        </View>
    );
};

export default Login;
