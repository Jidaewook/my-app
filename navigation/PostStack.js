import React, {useLayoutEffect, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute} from '@react-navigation/native';

import { PostScreen, PostDetail, PostRegister, Detail_Comments } from '../screens';
import BackBtn from '../component/common/BackBtn';

const PStack = createStackNavigator();

export default ({navigation, route}) => {

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        console.log("+++++", (routeName === 'PostRegister'))
        if(routeName === 'PostRegister' || routeName === 'PostDetail') {
            navigation.setOptions({tabBarStyle: {display: 'none'}})
            console.log('-----')
        } else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}})
            console.log('~~~~~')
        }
    }, [navigation, route])

    return (
        <PStack.Navigator
            screenOptions={{
                headerBackImage: () => <BackBtn />,
                headerBackTitleVisible: false,
                headerShown: false
            }}
        >
            <PStack.Screen 
                name="Post" 
                component={PostScreen} 
                options={{
                    // headerShown:false
                }}
            />
            <PStack.Screen 
                name="PostDetail" 
                component={PostDetail} 
                options={{
                    headerShown: true
                }}
            />
            <PStack.Screen 
                name="Detail_Comments" 
                component={Detail_Comments} 
                options={{
                    headerShown: true
                }}
            />
            <PStack.Screen 
                name="PostRegister" 
                component={PostRegister} 
                options={{
                    headerShown: true,
                }}
            />

        </PStack.Navigator>
    )
}

