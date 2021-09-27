import React from 'react';
import {View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

const BackBtn = () => {
    return (
        <View
            style={{paddingLeft: 5}}
        >
            <MaterialCommunityIcons 
                name="chevron-left"
                size={30}
                color="black"
            />
        </View>
    );
};

export default BackBtn;