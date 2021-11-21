import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { ProfileScreen, ProfileEdit, Setting, Detail, Alarm, Frequency, WebviewScreen } from '../screens';
import BackBtn from '../component/common/BackBtn';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const PStack = createStackNavigator();

export default ({navigation, route}) => {

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Detail" || routeName === "Setting" || routeName === "ProfileEdit") {
            navigation.setOptions({tabBarStyle: {display: 'none'}})
        } else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}})
        }
    }, [navigation, route])

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

