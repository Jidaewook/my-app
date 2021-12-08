import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../redux/userSlice';

import AuthLayout from '../../component/common/AuthLayout';
import FormInput from '../../component/common/FormInput';
import {colors, sizes} from '../../consts';
import TextButton from '../../component/common/TextButton';
import TextIconButton from '../../component/common/TextIconButton';
import facebookIcon from '../../assets/auth/facebook_icon.png';
import utils from '../../utils/Utils';
import { API_URL } from '../../api/baseApi';

const RegisterScreen = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [name, setName] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [showPass, setShowPass] = useState(false);

    const navigation = useNavigation();

    function isEnableSignup () {
        return (
            name != "" && password != "" && email != "" && emailErr == "" && passwordErr == "" && nameErr == ""
        )
    }

    const registerBtnTab = async () => {
        await axios.post(`${API_URL}/users/register`, {name, email, password})
                    .then(res => {
                        console.log(res)
                        if(res.status == 200){
                            navigation.navigate("LoginScreen")
                        } else {
                            alert(res.statusText)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        
                    })
    } 

return (
    <AuthLayout
        title="PASSME"
        subTitle="회원가입 하세요"
    >
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
            >
                <FormInput 
                    label={"NAME"}
                    value={name}
                    placeholder={'Insert Your Name'}
                    autoCompleteType="name"
                    containerStyle={styles.input}
                    onChange={(value) => {
                        setName(value)
                    }}
                    errorMsg={nameErr}
                    appendComponent={
                        <View
                            style={styles.checkView}
                        >
                            <AntDesign 
                                name={"check"}
                                color={(name != "") ? colors.main4 : colors.gray4}
                                size={24}
                            />
                        </View>
                    }
                />
                <FormInput 
                    label={'EMAIL'}
                    value={email}
                    placeholder={'Insert Your Email'}
                    containerStyle={styles.input}
                    autoCompleteType="email"
                    onChange={(value) => {
                        utils.validateEmail(value, setEmailErr)
                        setEmail(value)
                    }}
                    errorMsg={emailErr}
                    appendComponent={
                        <View
                            style={styles.checkView}
                        >
                            <AntDesign 
                                name={"check"}
                                color={(email != "") && (emailErr == "") ? colors.main4 : colors.gray4}
                                size={24}
                            />
                        </View>
                    }
                />
                <FormInput 
                    label={'PASSWORD'}
                    value={password}
                    secureTextEntry={!showPass}
                    placeholder={'Insert Your Password'}
                    autoCompleteType="password"
                    containerStyle={styles.input}
                    onChange={(value) => {
                        utils.validatePassword(value, setPasswordErr)
                        setPassword(value)
                    }}
                    errorMsg={passwordErr}
                    appendComponent={
                        <TouchableOpacity
                            style={styles.eyeView}
                            onPress={() => setShowPass(!showPass)}
                        >
                            <Feather 
                                name={showPass ? "eye" : "eye-off"}
                                size={24}
                                color={colors.gray2}
                                style={styles.eyeCheck}
                            />
                        </TouchableOpacity>
                    }
                />
                
                
                <TextButton 
                    buttonContainerStyle={{
                        backgroundColor: isEnableSignup() ? colors.main4 : colors.gray3, 
                        height: 55,
                        alignItems: 'center',
                        marginTop: 25,
                        borderRadius: 20 
                    }}
                    disabled={isEnableSignup() ? false : true}
                    onPress={() => registerBtnTab()}
                    label={"다음"}
                    labelStyle={styles.registerLabelStyle}
                />
                <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}
                >
                    <TouchableOpacity
                        style={styles.SmallButton1}
                        onPress={() => navigation.navigate("LoginScreen")}
                    >
                        <Text style={styles.SmallButtonText}>
                                로그인하기
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </AuthLayout>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    input: {
        marginTop: sizes.header
    },
    checkView: {
        justifyContent: 'center'
    },
    eyeView: {
        width: sizes.buttonHeight, 
        alignItems: 'flex-end', 
        justifyContent: 'center', 
        marginTop: sizes.header
    },
    eyeCheck: {
        marginTop: -sizes.header
    },
    registerLabelStyle: {
        fontSize: sizes.h3,
    },
    SmallButton1: {
        height: sizes.buttonHeight,
        width: sizes.buttonWidth,
        marginTop: sizes.header,
    },
    SmallButtonText: {
        fontSize: sizes.h4,
        color: colors.black,
        textAlign: 'center'
    },
})