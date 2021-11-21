import React, {useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { WorkbookScreen, Detail } from '../screens';
import BackBtn from '../component/common/BackBtn';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const WStack = createStackNavigator();

export default ({navigation, route}) => {

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Detail") {
            navigation.setOptions({tabBarStyle: {display: 'none'}})
        } else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}})
        }
    }, [navigation, route])

    return (
        <WStack.Navigator
            screenOptions={{
                headerBackImage: () => <BackBtn />,
                headerBackTitleVisible: false

            }}
        >
            <WStack.Screen 
                name="Workbook" 
                component={WorkbookScreen} 
                options={{
                    headerShown: false
                }}
            />
            <WStack.Screen 
                name="Detail" 
                component={Detail} 
                options={{
                    headerShown: true
                }}
            />

        </WStack.Navigator>
    )
}

