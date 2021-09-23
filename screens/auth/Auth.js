import React, {useState} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../redux/userSlice';

const Auth = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = () => {
        const userInput = {
            email, password
        }
        console.log("1", userInput)
        dispatch(userLogin(userInput))
    }

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
            <Text>
                AuthAuthAuthAuth
            </Text>
            <TextInput 
                placeholder={"email"}
                value={email}
                onChangeText={value => setEmail(value)}
            />
            <TextInput 
                placeholder={"password"}
                value={password}
                onChangeText={value => setPassword(value)}
            />
            
            <Button
                onPress={() => loginHandler()}
                title={"로그인하기"}
            />
                
        </View>
    );
};

export default Auth;