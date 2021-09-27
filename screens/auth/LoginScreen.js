import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../redux/userSlice';

import AuthLayout from '../../component/common/AuthLayout';
import FormInput from '../../component/common/FormInput';
import {colors, fonts, sizes} from '../../consts';
import TextButton from '../../component/common/TextButton';
import TextIconButton from '../../component/common/TextIconButton';
import facebookIcon from '../../assets/auth/facebook_icon.png';

const LoginScreen = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [showPass, setShowPass] = useState(false);

    const navigation = useNavigation();

    function isEnableSignin () {
        return (
            email != "" && password != "" && emailErr == ""
        )
    }

    const loginHandler = () => {
        const userInput = {
            email, password
        }
        console.log("1", userInput)
        dispatch(userLogin(userInput))
    }

    return (
        <AuthLayout
            title="PASSME LOGIN"
            subTitle="패스미 서비스를 이용하기 위해 로그인 하세요."
        >
            <View style={styles.formContainer}>
                <FormInput 
                    label={'E-mail'}
                    value={email}
                    placeholder={"Insert Your E-maul"}
                    autoCompleteType="email"
                    onChange={(value) => {
                        setEmail(value)
                    }}
                    errorMsg={emailErr}
                    appendComponent={
                        <View style={{justifyContent: 'center'}}> 
                            <AntDesign 
                                name={"check"}
                                color={(email != "") || (email != "" && emailErr == "") ? colors.main4 : colors.gray4}
                            />
                        </View>
                    }
                />
                <FormInput 
                    label={'PASSWORD'}
                    value={password}
                    secureTextEntry={!showPass}
                    placeholder={"Insert Your PASSWORD"}
                    containerStyle={{marginTop: 20}}
                    autoCompleteType="password"
                    onChange={(value) => {
                        setPassword(value)
                    }}
                    errorMsg={passwordErr}
                    appendComponent={
                        <TouchableOpacity
                            stlye={{width: 40, alignItems: 'flex-end', justifyContent: 'center', marginTop: 15}}
                            onPress={() => setShowPass(!showPass)}
                        >
                            <Feather 
                                name={showPass ? "eye" : "eye-off"}
                                size={24}
                                color={colors.gray2}
                                style={{marginTop: 15}}
                            />
                        </TouchableOpacity> 
                    }
                />     
                {/* <toggleDrawer 
                /> */}
                <TextButton 
                    buttonContainerStyle={{
                        backgroundColor: isEnableSignin() ? colors.main4 : colors.gray3, 
                        height: 55,
                        alignItems: 'center',
                        marginTop: 25,
                        borderRadius: 20 }}
                    disabled={isEnableSignin() ? false : true}
                    onPress={() => loginHandler()}
                    label={"로그인"}
                    labelStyle={styles.loginLabelStyle}
                /> 
                {/* Link Another Pages  */}
                <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}
                >
                    <TouchableOpacity
                        style={styles.SmallButton1}
                        onPress={() => navigation.navigate("RegisterScreen")}
                    >
                        <Text style={styles.SmallButtonText}>
                                회원가입
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.BarButton}>
                        |
                    </Text>
                    <TouchableOpacity
                        style={styles.SmallButton3}
                        onPress={() => navigation.navigate("ForgotPwScreen")}
                    >
                        <Text style={styles.SmallButtonText}>
                                비밀번호 찾기
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Footer */}
            <View>
                <TextIconButton 
                    label={"Continue with Facebook"}
                    icon={facebookIcon}
                    iconPosition={"LEFT"}
                    iconStyle={{tintColor: colors.white}}
                    labelStyle={{marginLeft: 15, color: colors.white}}
                    containerStyle={{height: 50, alignItems: 'center', borderRadius: 20, backgroundColor: 'blue'}}
                    onPress={() => alert("페이스북 로그인")}
                />
                <TextIconButton 
                    label={"Continue with Google"}
                    icon={require('../../assets/auth/google_icon.png')}
                    iconPosition={"LEFT"}
                    iconStyle={{tintColor: colors.white}}
                    labelStyle={{marginLeft: 15, color: colors.white}}
                    containerStyle={{height: 50, alignItems: 'center', borderRadius: 20, marginTop: 10, backgroundColor: colors.gray1}}
                    onPress={() => alert("구글 로그인")}
                />
            </View>
        </AuthLayout>
        
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginTop: 50,

    },
    buttonStyle: {
        height: 55,
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 20,

    },  
    loginLabelStyle: {
        fontSize: 16,

    },
    SmallButton1: {
        height: 30,
        width: 80,
        marginTop: 20,
        marginLeft: -10
    },
    SmallButton2: {
        height: 30,
        width: 100,
        marginTop: 20,
    },
    SmallButton3: {
        height: 30,
        width: 100,
        marginTop: 20
    },
    BarButton: {
        height: 30,
        width: 10,
        marginTop: 20,
        marginLeft: 15
    },
    SmallButtonText: {
        fontSize: sizes.h4,
        color: colors.black,
        textAlign: 'center'
    },
})