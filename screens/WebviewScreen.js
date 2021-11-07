import React, {useLayoutEffect, useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ActivityIndicator, View} from 'react-native';
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
                startInLoadingState={true}
                renderLoading={() => (
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, marginBottom: 200}}>
                        <ActivityIndicator color={colors.main4} size={'large'} />

                    </View>
                )}
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