import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

import { colors } from '../consts';

const WebviewScreen = ({route}) => {

    const {uri, title} = route.params;
    const navigation = useNavigation();

    const defaultUrl = "https://master.df476lzbmz9nc.amplifyapp.com/"

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title,

        }, [navigation])
    })

    return (
        <SafeAreaView style={styles.Container} >
            <WebView 
                source={{uri: defaultUrl + uri}}
            />
        </SafeAreaView>
    );
};

export default WebviewScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.white
    }
})