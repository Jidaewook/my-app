import React, {useState} from 'react';
import {AppLoading} from 'expo';
import * as Font from "expo-font";
import {Text, Image, View} from 'react-native';
import {Asset} from 'expo-asset';
import {Ionicons} from '@expo/vector-icons';
 
export default function App() {

  const cacheImage = images => 
    images.map(image => {
      if(typeof image === 'string'){
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
  });  

  const cacheFonts = fonts => 
    fonts.map(font => [Font.loadAsync(font), Font.loadAsync(font)]);

  const [isReady, setIsReady] = useState(false);
  
  const loadAsset = async() => {
    const images = cacheImage([
      "https://images.unsplash.com/photo-1584486188544-dc2e1417aff1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      require("./assets/splash.png")
    ]);
    const fonts = cacheFonts([Ionicons.font]);
    return Promise.all([...images, ...fonts]);
  };

  const onFinish = () => setIsReady(true);

  return isReady ? (
    <View>
      <Text>Ready!</Text>
    </View>

    ) : (
    <AppLoading 
      startAsync={loadAsset}
      onFinish={onFinish}
      onError={console.error}
    />
  );
};

