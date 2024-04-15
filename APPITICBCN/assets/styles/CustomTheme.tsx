// Defina una interfaz para sus colores personalizados.
interface CustomColors {
  listItem: string;
}

import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';


export const TemaClaro = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    listItem: '#ECE6F0',
    quadratNotes: '#30EFBC',
    onQuadratNotes: '#000000',
    doneButton: '#30EFBC',
    onDoneButton: '#000000',
  },
};

export const TemaOscuro = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    listItem: '#2B2930',
    quadratNotes: '#2F29A1',
    onQuadratNotes: '#FFFFFF',
    doneButton: '#2F29A1',
    onDoneButton: '#FFFFFF',
  },
};
