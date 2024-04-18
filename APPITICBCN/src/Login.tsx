import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import Logo from './components/Logo';
import { PreferencesContext } from './index';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';
import axios from 'axios';

const Login = () => {
    type NewsNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

    const navigation = useNavigation<NewsNavigationProp>();

    const { theme } = React.useContext(PreferencesContext);

    const [checked, setChecked] = React.useState(false);
    
    const [email, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('http://10.0.2.2:8082/api/auth/signin', { // Replace with your API URL
            email: email,
            password: password,
        })
        .then(response => {
            console.log('Success:', response.data);
            // Here you can handle the response, for example save the JWT token to local storage
    
            // After successful authentication, make a request to get the role ID
            axios.get('http://10.0.2.2:8082/api/general/role/'+ email) // Replace with your API URL
            .then(response => {
                const roleId = response.data;
                console.log('Role ID:', roleId);
                // Here you can handle the role ID, for example save it to local storage
            })
            .catch((error) => {
                console.error('Error:', error);
                // Here you can handle errors
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            // Here you can handle errors
        });
    };

    const navigateToRegister = () => {
        navigation.navigate('Register');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <Logo />
                <TextInput
                    theme={{ colors: { primary: "#3A31F4" }}}  
                    style={{ marginTop: 20, marginBottom: 20 }}
                    label="Email"
                    value={email}
                    onChangeText={setUserName}
                    mode="outlined"
                />
                <TextInput  
                    theme={{ colors: { primary: "#3A31F4" }}} 
                    style={{ marginTop: 20 }} 
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    mode="outlined"
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text onPress={() => { setChecked(!checked); }}>Remember me</Text>
                    <Checkbox
                        theme={{ colors: { primary: "#3A31F4" }}}  
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked);
                        }}
                    />
                </View>
                <Button 
                    mode="contained" 
                    onPress={handleLogin}
                    labelStyle={{
                        color: theme.colors.onDoneButton,
                        fontSize: 20,
                    }}
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
                <Text style={{alignSelf: 'center', fontSize: 18}} onPress={navigateToRegister}>
                    Registrate!
                </Text>
            </View>
        </View>
    );
};

export default Login;
