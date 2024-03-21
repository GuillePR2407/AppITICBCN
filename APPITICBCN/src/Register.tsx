import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import Logo from './components/Logo';

const Register = () => {
    const [gmail, setGmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleLogin = () => {
        console.log('Gmail:', gmail);
        console.log('Username:', userName);
        console.log('Password:', password);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ width: '80%', alignSelf: 'center' }}>
                <Logo />
                <TextInput
                    theme={{colors: { 
                        primary: "#3A31F4" }}}  
                    style={{ marginTop: 20, marginBottom: 20 }}
                    label="User"
                    value={userName}
                    onChangeText={setUserName}
                    mode="outlined"
                    
                />
                <TextInput
                    theme={{colors: { 
                        primary: "#3A31F4" }}}  
                    style={{ marginTop: 20, marginBottom: 20 }}
                    label="Email"
                    value={gmail}
                    onChangeText={setGmail}
                    mode="outlined"
                    
                />
                <TextInput  theme={{colors: { 
                    primary: "#3A31F4" }}} 
                    style={{ marginTop: 20 , marginBottom: 20  }} 
                    label="Password"
                    value={password}
                    secureTextEntry
                    onChangeText={setPassword}
                    mode="outlined"
                />
                <TextInput  theme={{colors: { 
                    primary: "#3A31F4" }}} 
                    style={{ marginTop: 20 , marginBottom: 20  }} 
                    label="Repeat Password"
                    value={password2}
                    secureTextEntry
                    onChangeText={setPassword2}
                    mode="outlined"
                />
                <Button mode="contained" onPress={handleLogin} 
                style={{marginTop: 20, marginBottom: 20, height:'10%', justifyContent: 'center', width: '60%', alignSelf: 'center'}}
                textColor="#000000">
                    Register
                </Button>
            </View>
        </View>
    );
};

export default Register;
