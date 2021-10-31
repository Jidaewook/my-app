import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const RegisterBtn = ({onPress, title, containerStyle, textStyle}) => {
    return (
        <TouchableOpacity
            activeOpacity={.5}
            onPress={onPress}
            style={[styles.button, containerStyle]}
        >
            <Text style={[textStyle, {textAlign: 'center'}]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default RegisterBtn;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderWidth: 1,
        paddingVertical: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },

})