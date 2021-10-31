import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { ProfileScreen, ProfileEdit, Setting, Detail, Alarm, Frequency, WebviewScreen } from '../screens';
import BackBtn from '../component/common/BackBtn';

const PStack = createStackNavigator();

export default () => {
    return (
        <PStack.Navigator
            screenOptions={{
                headerBackImage: () => <BackBtn />,
                headerBackTitleVisible: false                
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
            <PStack.Screen 
                name="Frequency" 
                component={Frequency} 
                options={{
                    headerShown: true
                }}
            />
            <PStack.Screen 
                name="Webview" 
                component={WebviewScreen} 
                options={{
                    headerShown: true
                }}
            />
            <PStack.Screen 
                name="Alarm" 
                component={Alarm} 
                options={{
                    headerShown: true
                }}
            />


        </PStack.Navigator>
    )
}

