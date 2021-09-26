import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { WorkbookScreen, Detail } from '../screens';

const WStack = createStackNavigator();

export default () => {
    return (
        <WStack.Navigator>
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
                    headerShown: false
                }}
            />

        </WStack.Navigator>
    )
}

