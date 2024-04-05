import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

const TramitsItem = ({ route }) => {
    const { colors } = useTheme(); // Accede a los colores del tema actual

    const { titulo, subtitulo, texto } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.titulo, { color: colors.onSecondaryContainer }]}>{titulo}</Text>
        <Text style={[styles.subtitulo, { color: colors.onSecondaryContainer}]}>{subtitulo}</Text>
        <Text style={[styles.texto, { color: colors.onSecondaryContainer}]}>{texto}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
container: {
    padding: 20,
},
titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
},
subtitulo: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
},
texto: {
    fontSize: 16,
    fontWeight: '400',
},
});

export default TramitsItem;
