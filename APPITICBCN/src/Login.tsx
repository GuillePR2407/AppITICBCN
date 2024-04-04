import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import Logo from './components/Logo';
import { useExampleTheme } from './index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import Register from './Register';

const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const theme = useExampleTheme();
    const height = theme.isV3 ? 80 : 56;
    const [checked, setChecked] = React.useState(false);
    
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Username:', userName);
        console.log('Password:', password);
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
                    value={userName}
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
                    style={{
                        marginTop: 20,
                        marginBottom: 20,
                        height: '10%',
                        justifyContent: 'center',
                        width: '60%',
                        alignSelf: 'center'
                    }}
                    textColor="#000000">
                    Login
                </Button>
                <Text style={{ marginBottom: 20, marginTop: 5, alignSelf: 'center'}} onPress={navigateToRegister}>
                    Registrate!
                </Text>
            </View>
        </View>
    );
};

export default Login;
