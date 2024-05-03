import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Logo from './components/Logo';
import { registerUser} from './services/authService';
import { PreferencesContext } from './index';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';


const Register = () => {
    type NewsNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

    const navigation = useNavigation<NewsNavigationProp>();
    const { theme } = useContext(PreferencesContext);

    const [gmail, setGmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(gmail, userName, password);
            console.log('Registered');

    
            navigation.navigate('Login');
    
            // Redirigir al usuario o realizar otras acciones
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <Logo />
                <TextInput
                    theme={{ colors: { primary: theme.colors.primary }}}   
                    style={{ marginTop: 20, marginBottom: 20 }}
                    label="User"
                    value={userName}
                    onChangeText={setUserName}
                    mode="outlined"
                    
                />
                <TextInput
                    theme={{ colors: { primary: theme.colors.primary }}}  
                    style={{ marginTop: 20, marginBottom: 20 }}
                    label="Email"
                    value={gmail}
                    onChangeText={setGmail}
                    mode="outlined"
                    
                />
                <TextInput  
                    theme={{ colors: { primary: theme.colors.primary }}}  
                    style={{ marginTop: 20 , marginBottom: 20  }} 
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    mode="outlined"
                />
                <TextInput  
                    theme={{ colors: { primary: theme.colors.primary }}}  
                    style={{ marginTop: 20 , marginBottom: 20  }} 
                    label="Repeat Password"
                    value={password2}
                    secureTextEntry
                    onChangeText={setPassword2}
                    mode="outlined"
                />
                <Button mode="contained" onPress={handleRegister} 
                style={{marginTop: 20, marginBottom: 20, height:'10%', justifyContent: 'center', width: '60%', alignSelf: 'center'}}
                textColor="#000000">
                    Register
                </Button>
            </View>
        </View>
    );
};

export default Register;
