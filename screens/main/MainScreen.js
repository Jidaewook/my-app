// 로그아웃 시퀀스

import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { logOut } from '../../redux/userSlice';

const MainScreen = () => {

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const {isLoggedIn, token} = useSelector(state => state.usersReducer);

    console.log(isLoggedIn);

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text>
                Main
            </Text>
            
        </View>
    );
};

export default MainScreen;