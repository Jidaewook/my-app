import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import {useSelector, useDispatch} from 'react-redux';

import Tabs from './Tabs';
import AuthStack from './AuthStack';

export default () => {
    const dispatch = useDispatch();
    const { isLoggedIn, token } = useSelector(state => state.usersReducer);

    return (
        <NavigationContainer>
            {isLoggedIn ? <Tabs /> : <AuthStack />}
        </NavigationContainer>
    );
};
