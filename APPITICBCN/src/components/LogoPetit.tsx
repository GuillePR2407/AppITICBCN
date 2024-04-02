import React from 'react';
import { Image } from 'react-native';

const LogoPetit = () => {
  return (
    <Image
      source={require('../../assets/images/Logo.png')}
      style={{ width: 40, height: 40, paddingRight: -30}} // Establece el ancho y la altura de la imagen
      resizeMode="contain" // Opciones: 'cover', 'contain', 'stretch', 'repeat', 'center'
    />
  );
};

export default LogoPetit;