import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { PreferencesContext } from '../index';
import { KeyboardTypeOptions } from 'react-native';
import { registerUserRole} from '../services/authService';

const AddUserSection = () => {
    const { theme } = React.useContext(PreferencesContext);
    
    const [formData, setFormData] = React.useState({
        nombre: '',
        //apellido: '',
        //edad: '',
        //telefono: '',
        email: '',
        //direccion: '',
        rol: '',
        password: ''
    });

    const formFields: Array<{ key: string; label: string; keyboardType: KeyboardTypeOptions }> = [
        { key: 'nombre', label: 'Nombre', keyboardType: 'default' },
        //{ key: 'apellido', label: 'Apellido', keyboardType: 'default' },
        //{ key: 'edad', label: 'Edad', keyboardType: 'numeric' },
        //{ key: 'telefono', label: 'Teléfono', keyboardType: 'phone-pad' },
        { key: 'email', label: 'Correo Electrónico', keyboardType: 'email-address' },
        //{ key: 'direccion', label: 'Dirección', keyboardType: 'default' },
        { key: 'rol', label: 'Rol', keyboardType: 'default'},
        { key: 'password', label: 'Contrasenya', keyboardType: 'default'}
    ];

    const handleChange = (key, value) => {
        setFormData(prevState => ({ ...prevState, [key]: value }));
    };

    const handleSubmit = async () => {
        // Implementar lógica de envío de datos
        console.log("Enviando datos del usuario:", formData);
    
        const { email, nombre, password, rol } = formData;
    
        try {
            await registerUserRole(email, nombre, password, rol);
            console.log('User registered successfully');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            {formFields.map(field => (
                <TextInput
                    key={field.key}
                    label={field.label}
                    value={formData[field.key]}
                    onChangeText={text => handleChange(field.key, text)}
                    mode="outlined"
                    style={{ marginBottom: 10 }}
                    keyboardType={field.keyboardType}
                />
            ))}
            <Button 
                mode="contained" 
                onPress={handleSubmit}
                labelStyle={{
                    color: theme.colors.onDoneButton,
                    fontSize: 20,
                }}
                style={{
                    marginTop: 20,
                    marginBottom: 20,
                    borderRadius: 50,
                    height: 50,
                    justifyContent: 'center',
                    width: 200,
                    alignSelf: 'center',
                    backgroundColor: theme.colors.doneButton,
                    
                }}>
                Afegir usuari
            </Button>
        </ScrollView>
    );
}

export default AddUserSection;
