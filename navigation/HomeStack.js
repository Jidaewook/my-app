import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { MainScreen, Notification, Detail, Detail2, MoreScreen, Detail_Comments } from '../screens';
import BackBtn from '../component/common/BackBtn';

const HStack = createStackNavigator();

export default () => {
    return (
        <HStack.Navigator
            screenOptions={{
                headerBackImage: () => <BackBtn />,
                headerBackTitleVisible: false
            }
        }
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
                    headerShown: true
                }}
            />
            <HStack.Screen 
                name="Detail" 
                component={Detail}
                options={{
                    headerShown: true
                }} 
            />
            <HStack.Screen 
                name="Detail2" 
                component={Detail2} 
                options={{
                    headerShown: true
                }}
            />
            <HStack.Screen 
                name="Detail_Comments" 
                component={Detail_Comments} 
                options={{
                    headerShown: true
                }}
            />
            <HStack.Screen 
                name="More" 
                component={MoreScreen}
                options={{
                    headerShown: true
                }} 
            />
        </HStack.Navigator>
    )
}

