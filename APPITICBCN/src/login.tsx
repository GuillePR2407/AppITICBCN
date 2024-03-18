import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useExampleTheme } from './index';

const theme = useExampleTheme();
const height = theme.isV3 ? 80 : 56;

interface LoginState {
    userName: string;
    password: string;
}

export class Login extends Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            userName: '',
            password: '',
        };
    }

    handleUserNameChange = (text: string) => {
        this.setState({ userName: text });
    };

    handlePasswordChange = (text: string) => {
        this.setState({ password: text });
    };

    handleLogin = () => {
        const { userName, password } = this.state;
        // Aquí puedes implementar la lógica de inicio de sesión
        console.log('Username:', userName);
        console.log('Password:', password);
    };

    render() {
        const { userName, password } = this.state;
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ width: '80%', alignSelf: 'center' }}>
                    <TextInput
                        label="Email"
                        value={userName}
                        onChangeText={this.handleUserNameChange}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={this.handlePasswordChange}
                    />
                    <Button mode="contained" onPress={this.handleLogin} style={{ marginTop: 20 }}>
                        Login
                    </Button>
                </View>
            </View>
        );
    }
}

export default Login;
