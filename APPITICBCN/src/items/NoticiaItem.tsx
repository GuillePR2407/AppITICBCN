import React, { useState } from 'react';
import { WebView } from 'react-native-webview';

const NoticiaItem = ({ route }) => { 
    const { url } = route.params;

    const [contentVisible, setContentVisible] = useState(false);

    const jsCode = `
        const articleElement = document.querySelector('article');
        if (articleElement) {
            const parentElement = articleElement.parentElement;
            document.body.innerHTML = '';
            document.body.appendChild(parentElement);
        } else {
            console.error('Elemento <article> no encontrado.');
        }
    `;


    return (
    <WebView
        source={{uri: url}}
        injectedJavaScript={jsCode}
        javaScriptEnabled={true}
    />
    );
}

export default NoticiaItem;