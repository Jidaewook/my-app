import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { ProfileScreen, ProfileEdit, Setting, Detail } from '../screens';
import BackBtn from '../component/common/BackBtn';

const PStack = createStackNavigator();

export default () => {
    return (
        <PStack.Navigator
            screenOptions={{
                headerBackImage: () => <BackBtn />
                
            }}
        >
            <PStack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PStack.Screen 
                name="ProfileEdit" 
                component={ProfileEdit} 
                options={{
                    headerShown: false
                }}
            />
            <PStack.Screen 
                name="Setting" 
                component={Setting} 
                options={{
                    headerShown: false
                }}
            />
            <PStack.Screen 
                name="Detail" 
                component={Detail} 
                options={{
                    headerShown: false
                }}
            />

        </PStack.Navigator>
    )
}

