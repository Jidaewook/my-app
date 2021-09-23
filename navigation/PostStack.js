import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { PostScreen } from '../screens';

const PStack = createStackNavigator();

export default () => {
    return (
        <PStack.Navigator>
            <PStack.Screen 
                name="Post" 
                component={PostScreen} 
                options={{
                    headerShown: false
                }}
            />

        </PStack.Navigator>
    )
}

