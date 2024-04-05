import React from 'react';
import { Image } from 'react-native';

const Logo = () => {
  return (
    <Image
      source={require('../../assets/images/Logo.png')}
      style={{ width: 200, height: 200 , alignSelf:"center"}} // Establece el ancho y la altura de la imagen
      resizeMode="contain" // Opciones: 'cover', 'contain', 'stretch', 'repeat', 'center'
    />
  );
};

export default Logo;