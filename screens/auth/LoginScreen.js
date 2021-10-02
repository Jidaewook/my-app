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
                        <View style={styles.center}> 
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
                    containerStyle={styles.inputView}
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
                                style={{marginTop: sizes.header}}
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
                    style={styles.SmallBtnView}
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
                        style={styles.SmallButton2}
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
                    labelStyle={styles.oathView}
                    containerStyle={styles.faceView}
                    onPress={() => alert("페이스북 로그인")}
                />
                <TextIconButton 
                    label={"Continue with Google"}
                    icon={require('../../assets/auth/google_icon.png')}
                    iconPosition={"LEFT"}
                    iconStyle={{tintColor: colors.white}}
                    labelStyle={styles.oathView}
                    containerStyle={styles.googleView}
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
        marginTop: sizes.headerTop,
    },
    center: {
        justifyContent: 'center'
    },  
    buttonStyle: {
        height: sizes.buttonHeight,
        alignItems: 'center',
        marginTop: sizes.header,
        borderRadius: 20,
    },  
    loginLabelStyle: {
        ...fonts.h3
    },
    inputView: {
        marginTop: sizes.header
    },    
    SmallBtnView: {
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    SmallButton1: {
        height: sizes.buttonHeight,
        width: sizes.buttonWidth,
        marginTop: sizes.header,
    },
    SmallButton2: {
        height: sizes.buttonHeight,
        width: sizes.buttonWidth,
        marginTop: sizes.header,
        marginLeft: sizes.body
    },
    BarButton: {
        height: sizes.buttonHeight,
        width: sizes.body,
        marginTop: sizes.header,
        marginLeft: sizes.body
    },
    SmallButtonText: {
        fontSize: sizes.h4,
        color: colors.black,
        textAlign: 'center'
    },
    oathView: {
        marginLeft: sizes.sideLine, 
        color: colors.white
    },
    faceView: {
        height: sizes.bigBtnHeight, 
        alignItems: 'center', 
        borderRadius: 20, 
        backgroundColor: 'blue'
    },
    googleView: {
        height: sizes.bigBtnHeight, 
        alignItems: 'center', 
        borderRadius: 20, 
        marginTop: sizes.header, 
        backgroundColor: colors.gray1
    }
})