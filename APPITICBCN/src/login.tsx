import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

// Utilizando hooks para el tema, asumiendo que es exportado desde './index'.
// Este es solo un ejemplo; ajusta el uso del tema según sea necesario.
import { useExampleTheme } from './index';

const Login = () => {
const theme = useExampleTheme();
// Asumiendo que isV3 es una propiedad del tema para determinar estilos
const height = theme.isV3 ? 80 : 56;

const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');

const handleLogin = () => {
    // Implementa aquí la lógica de inicio de sesión
    console.log('Username:', userName);
    console.log('Password:', password);
};

return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
    <View style={{ width: '80%', alignSelf: 'center' }}>
        <TextInput
        label="Email"
        value={userName}
        onChangeText={setUserName} // Actualiza directamente el estado con el valor del input
        />
        <TextInput
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword} // Igual que arriba, actualiza directamente el estado
        />
        <Button mode="contained" onPress={handleLogin} style={{ marginTop: 20, height }}>
        Login
        </Button>
    </View>
    </View>
);
};

export default Login;
