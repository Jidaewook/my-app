import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { MainScreen, Notification, Detail } from '../screens';
import BackBtn from '../component/common/BackBtn';

const HStack = createStackNavigator();

export default () => {
    return (
        <HStack.Navigator
            screenOptions={{
                headerBackImage: () => <BackBtn />
                
            }}
        >
            <HStack.Screen 
                name="Main" 
                component={MainScreen} 
                options={{
                    headerShown: false,
                }}
            />
            <HStack.Screen 
                name="Notification" 
                component={Notification} 
                options={{
                    headerShown: false
                }}
            />
            <HStack.Screen 
                name="Detail" 
                component={Detail}
                options={{
                    headerShown: true
                }} 
            />
        </HStack.Navigator>
    )
}

