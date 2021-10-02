import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { LoginScreen, RegisterScreen, AddInfoScreen, ForgotPwScreen, Welcome } from '../screens';

import { HomeStack } from '.';

const PStack = createStackNavigator();

export default () => {
    return (
        <PStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={"Welcome"}
        >
            <PStack.Screen 
                name="Welcome" 
                component={Welcome} 
            />            
            <PStack.Screen 
                name="LoginScreen" 
                component={LoginScreen} 
            />
            <PStack.Screen 
                name="RegisterScreen" 
                component={RegisterScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PStack.Screen 
                name="AddInfoScreen" 
                component={AddInfoScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PStack.Screen 
                name="MainStack" 
                component={HomeStack} 
                options={{
                    headerShown: false
                }}
            />
            <PStack.Screen 
                name="ForgotPwScreen" 
                component={ForgotPwScreen} 
                options={{
                    headerShown: false
                }}
            />
        </PStack.Navigator>
    )
}

