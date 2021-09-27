import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { colors } from '../../consts';

const TextButton = ({buttonContainerStyle, disabled, onPress, labelStyle, label}) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                ...buttonContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text
                style={{
                    color: colors.white,
                    ...labelStyle
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default TextButton;