import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { WorkbookScreen, Detail } from '../screens';
import BackBtn from '../component/common/BackBtn';

const WStack = createStackNavigator();

export default () => {
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

