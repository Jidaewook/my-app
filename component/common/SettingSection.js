import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {colors, fonts, sizes} from '../../consts'

const SettingSection = ({title}) => {
    return (
            <View style={styles.Container}>
                <View style={styles.SingleContainer}>
                </View>
            </View>

    );
};

export default SettingSection;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: colors.gray6,
        flexDirection: 'row',
        alignItems: 'center',
        padding: sizes.body / 2,
    },
    SingleContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }, 
    ProfileContainer: {
        flex: 1,
        height: sizes.header * 2, 
        justifyContent: 'center'
    },
    ProfileTitle: {
        ...fonts.h4,
        color: colors.gray3,
        // fontweight: '800',
        marginLeft: sizes.body * 1.5
    }
})