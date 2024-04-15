import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import Logo from './components/Logo';
import { PreferencesContext } from './index';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';
import Register from './Register';

const Login = () => {
    type NewsNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>

    const navigation = useNavigation<NewsNavigationProp>();

    const { theme } = React.useContext(PreferencesContext);

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
