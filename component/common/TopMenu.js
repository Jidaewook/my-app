import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../consts';

const TopMenu = ({tab, onPress, isActive}) => {
    return (
        <TouchableOpacity
            key={`tab-${tab}`}
            onPress={onPress}
            style={[styles.tab, isActive ? styles.active : null]}
        >
            <Text
                style={[styles.meunText, {color: isActive ? colors.main4 : colors.black }]}
            >
                {tab}
            </Text>
        </TouchableOpacity>
    )
};

export default TopMenu;

const styles = StyleSheet.create({
    tab: {
        marginRight: 20,
        paddingVertical: 15
    },
    active: {
        borderBottomColor: colors.main4,
        // themes.colors.title,
        borderBottomWidth: 3
    },
    meunText: {
        fontSize: 15, 
        fontWeight: 'bold', 
    }
})