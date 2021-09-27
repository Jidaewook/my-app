import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { colors } from '../../consts';

const BadgePill = ({title, containerStyle, textStyle}) => {
    return (
        <View
            style={[styles.badge, containerStyle]}
        >
            <Text
                style={[{fontSize: 12, letterSpacing: -0.78, color: 'red'}, textStyle]}
            >
                {title}
            </Text>
        </View>
    );
};

export default BadgePill;

const styles = StyleSheet.create({
    badge: {
        // backgroundColor: colors.gray3,
        borderColor: colors.gray5,
        color: colors.black,
        borderWidth: 1,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});