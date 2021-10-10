import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { PostScreen, PostDetail } from '../screens';
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
                name="PostDetail" 
                component={PostDetail} 
                options={{
                    headerShown: true
                }}
            />

        </PStack.Navigator>
    )
}

