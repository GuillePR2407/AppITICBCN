import * as React from 'react';
import {Text, View, TextInput } from 'react-native-paper';

const login = () => {
  const [text, setText] = React.useState("");

  return (
    <view style={{flex: 1,  justifyContent: "center", alignItems: "center"}}>
        <TextInput
            label="Email"
            value={text}
            onChangeText={text => setText(text)}
        />
    </view>
    
  );
};

export default login;