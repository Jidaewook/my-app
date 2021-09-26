import React from 'react';
import {View, Text} from 'react-native';
import { colors } from '../../consts';

const HLine = ({color}) => {
    return (
        <View
            style={[{
                width: '98%',
                margin: 5,
                height: 1,
                backgroundColor: colors.gray5
            }, color]}
        />
    );
};

export default HLine;