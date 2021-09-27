import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { ProfileScreen, ProfileEdit, Setting, Detail } from '../screens';

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
            <PStack.Screen 
                name="ProfileEdit" 
                component={ProfileEdit} 
                options={{
                    headerShown: true
                }}
            />
            <PStack.Screen 
                name="Setting" 
                component={Setting} 
                options={{
                    headerShown: true
                }}
            />
            <PStack.Screen 
                name="Detail" 
                component={Detail} 
                options={{
                    headerShown: true
                }}
            />

        </PStack.Navigator>
    )
}

