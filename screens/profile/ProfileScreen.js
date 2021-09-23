import React from 'react';
import {View, Text, Button} from 'react-native';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/userSlice';


const ProfileScreen = () => {

    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <View>
            <Text>
            ProfileScreen
            </Text>
            <Button 
                onPress={() => logOutHandler()}
                title={"로그아웃"}
            />
        </View>
    );
};

export default ProfileScreen;