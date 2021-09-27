import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import {colors, fonts, sizes} from '../../consts';

const AuthLayout = ({titleContainerStyle, title, subTitle, children}) => {
    return (
        <View
            style={styles.container}
        >
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: 25
                }}
            >
                {/* App Logos  */}
                <View
                    style={{alignItems: 'center'}}
                >
                    <Image 
                        source={require('../../assets/auth/logo.png')}
                        resizeMode='contain'
                        style={{
                            height: 100,
                            width: 200,
                            marginTop: 20
                        }}
                    />
                </View>
                {/* Title */}
                <View
                    style={{marginTop: 25, ...titleContainerStyle}}
                >
                    <Text
                        style={[styles.title]}
                    >
                        {title}
                    </Text>
                    <Text style={styles.subTitle}>
                        {subTitle}
                    </Text>
                </View>
                {children}
            </KeyboardAwareScrollView>
            
        </View>
    );
};

export default AuthLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        paddingVertical: 25,
        backgroundColor: colors.white
    },
    title: {
        textAlign: 'center',
        fontSize: sizes.h1,
        fontWeight: 'bold'
    },  
    subTitle: {
        textAlign: 'center',
        color: colors.gray4,
        marginTop: 25,
        fontSize: sizes.h4
    }
})