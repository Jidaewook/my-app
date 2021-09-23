import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { WorkbookScreen } from '../screens';

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

        </WStack.Navigator>
    )
}

