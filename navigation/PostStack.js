import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { PostScreen, PostDetail, Detail2 } from '../screens';
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
                name="Post" 
                component={PostScreen} 
                options={{
                    headerShown: false
                }}
            />
            <PStack.Screen 
                name="Detail2" 
                component={Detail2} 
                options={{
                    headerShown: true
                }}
            />

        </PStack.Navigator>
    )
}

