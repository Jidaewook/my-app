import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { ProfileScreen } from '../screens';

const PStack = createStackNavigator();

export default () => {
    return (
        <PStack.Navigator>
            <PStack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    headerShown: true
                }}
            />

        </PStack.Navigator>
    )
}

