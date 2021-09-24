import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { MainScreen, Notification } from '../screens';

const HStack = createStackNavigator();

export default () => {
    return (
        <HStack.Navigator>
            <HStack.Screen 
                name="Main" 
                component={MainScreen} 
                options={{
                    headerShown: true
                }}
            />
            <HStack.Screen 
                name="Notification" 
                component={Notification} 
                options={{
                    headerShown: true
                }}
            />
        </HStack.Navigator>
    )
}

