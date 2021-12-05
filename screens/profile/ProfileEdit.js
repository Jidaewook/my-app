import React, {useState, useEffect} from 'react';
import {Text,TouchableOpacity, View, TextInput, Image, StyleSheet, ScrollView, Alert} from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'; 
import { useNavigation } from '@react-navigation/core';

import { useSelector } from 'react-redux';

import { colors, fonts, sizes } from '../../consts';
import { API_URL } from '../../api/baseApi';

const ProfileEdit = () => {

    const navigation = useNavigation();

    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [institue, setInstitue] = useState('');
    const [introduce, setIntroduce] = useState('');
    const [area, setArea] = useState('');

    // 로그인한 유저정보 가져오기 위한 토큰 인식/헤더에 토큰 적용/토큰 넘겨서 정보 겟
    const { token } = useSelector(state => state.usersReducer);

    const config = {
        headers : {
            Authorization : "Bearer " + token 
        }
    }

    const getInfo = async() => {
        try {
            const {data} = await axios.get(`${API_URL}/users/userinfo`, config)
            // const {data} = await axios.get('http://localhost:8081/users/userinfo', config)

            setName(data.name)
            setInstitue(data.institue)
            setIntroduce(data.introduce)
            setArea(data.area)
            setId(data._id)
        } catch(err) {
            console.log(err)
        }
    }

    const saveBtnTab = async (userInput) => {

        const newData = {
            name: name,
            institue: institue,
            introduce: introduce,
            area: area
        }
        console.log(newData)
        await axios
            .put(`${API_URL}/users/${id}`, newData, config)
            // .put(`http://localhost:8081/users/${id}`, newData, config)
            .then(() => navigation.goBack())        
            .catch(err => {
                console.log(err)

            }) 
    }

    useEffect(() => {
        getInfo();
    }, {})

    return (
        <ScrollView
            style={styles.Container}
        >
            <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                contentContainerStyle={
                    styles.keyboardView
                }
            >
                <View style={styles.ContainerScreen}>
                    <View 
                        style={styles.ContainerView}
                    >
                        <Text style={styles.ImageContainer}>
                            프로필 사진
                        </Text>
                        <TouchableOpacity style={styles.ImageBtn}>
                            <Image 
                                source={require('../../assets/profile/profile_sample.jpeg')}
                                style={styles.avatar}
                            />  
                        </TouchableOpacity>
                    </View> 
                    <View style={styles.TextView}>
                        <View style={styles.TitleContainer}>
                            <Text style={styles.TextContainer}>
                                닉네임
                            </Text>
                        </View>
                        <View style={styles.TitleContainer}>
                            <View style={styles.inputView}>
                                <TextInput 
                                    style={styles.ContentContainer}
                                    value={name}
                                    placeholder={'이름'}
                                    onChangeText={(input) => setName(input)}
                                />
                            </View>
                    </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.TabContainer}>
                        <View style={styles.TitleContainer}>
                            <Text style={styles.TextContainer}>
                                선호 기관
                            </Text>
                        </View>
                        <View style={styles.TitleContainer}>
                            <View style={styles.inputView}>
                                <TextInput 
                                    style={styles.ContentContainer}
                                    value={institue}
                                    placeholder={'선호기관'}
                                    onChangeText={(input) => setInstitue(input)}
                                />
                            </View>
                        </View>
                    </View> 
                    <View style={styles.divider} />
                    <View style={styles.TabContainer}>
                        <View style={styles.TitleContainer}>
                            <Text style={styles.TextContainer}>
                                거주지
                            </Text>
                        </View>
                        <View style={styles.TitleContainer}>
                            <View style={styles.inputView}>
                                <TextInput 
                                    style={styles.ContentContainer}
                                    editable
                                    value={area}
                                    placeholder={'거주지역'}
                                    onChangeText={(input) => setArea(input)}
                                />
                            </View>
                        </View>
                    </View>  
                    <View style={styles.divider} />
                    <View style={styles.divider} />
                    <View style={styles.TabContainer}>
                        <View style={styles.TitleContainer}>
                            <Text style={styles.TextContainer}>
                                자기소개
                            </Text>
                        </View>
                    </View>
                    <View style={styles.IntroContainer}>
                        <View style={styles.inputView}>
                            <TextInput 
                                style={styles.introduce} 
                                multiline 
                                numberoflines={4}
                                value={introduce}
                                placeholder={'자기소개'}
                                onChangeText={(input) => setIntroduce(input)}
                            />      
                        </View>              
                    </View>
                    <View style={styles.regView}>
                        <TouchableOpacity
                            style={styles.CommentBtn}
                            onPress={(input) => 
                                Alert.alert(
                                    "수정하시겠습니까?",
                                    "",
                                    [
                                        {
                                            text: '확인', onPress: () => {
                                                saveBtnTab(input)
                                            }
                                        },
                                        {
                                            text: '취소', onPress: () => console.log("Cancel"),
                                            style: "cancel"
                                        }
                                    ]
                                )
                            }
                        >
                            <Text style={styles.RegisterButton}>
                                등록
                            </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
            </KeyboardAwareScrollView>
            
            
        </ScrollView>
    );
};

export default ProfileEdit;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: colors.white,
        flex: 1
    },
    ContainerScreen: {
        marginHorizontal: sizes.sideLine,
    },
    keyboardView: {

    },
    ContainerView: {
        flexDirection: 'row', 
        width: '100%', 
        marginTop: sizes.header, 
        alignItems: 'center'
    },
    ImageBtn: {
        alignItems: 'flex-end'
    },
    ImageContainer: {
        width: '81%',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: colors.gray1,
        ...fonts.h4,    
    },
    TextView: {
        marginTop: sizes.sideLine
    },
    TextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: colors.gray1,
        ...fonts.h4,
        width: '90%'
    },
    TabContainer: {
        marginTop: sizes.header/1.5
    },
    TitleContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    inputView: {
        alignItems: 'center', 
        width: '100%'
    },
    EditBtn: {
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        marginLeft: -sizes.sideLine
    },
    EditContainer: {
        justifyContent: 'center',
        marginTop: sizes.header,
        ...fonts.h5,
        color: colors.gray1
    },
    ContentContainer: {
        width: sizes.width*0.93,
        height: sizes.sideLine * 2.5,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 5,
        justifyContent: 'center',
        marginTop: sizes.header,
        ...fonts.h5,
        color: colors.black,
        // backgroundColor: colors.gray6,
        paddingVertical: sizes.header,
        paddingHorizontal: sizes.body/2,
    },
    
    avatar: {
        width: sizes.profileAvatar,
        height: sizes.profileAvatar,
        borderRadius: 62,
        borderWidth: 0,
        alignItems: 'flex-end'
    },
    avatarContainer: {
        position: 'relative',
        marginTop: -sizes.header,
        alignItems: 'center'
    },
    IntroContainer: {
        width: '100%',
        height: 130,
    },
    introduce: {
        width: sizes.width*0.93,
        height: sizes.sideLine * 5,
        marginTop: sizes.header,
        backgroundColor: colors.white,
        paddingHorizontal: sizes.body/2,
        paddingVertical: sizes.header,
        color: colors.black,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 5,
        ...fonts.h5
    },
    divider: {
        width: '95%',
        borderWidth: 0.3,
        marginTop: sizes.header,
        borderColor: colors.white
    }, 
    SubIntro: {
        ...fonts.h5, 
        marginLeft: sizes.sideLine, 
        color: colors.gray
    },
    EditIntro: {
        justifyContent: 'center',
        ...fonts.h5,
        color: colors.gray1,
        marginLeft: -sizes.body
    },
    regView: {
        // backgroundColor: colors.gray5,
        borderColor: colors.black,
        borderRadius: 10,
        // width: sizes.width*0.95,
    },
    CommentBtn: {
        width: sizes.width*0.93,
        height: sizes.sideLine*2.5,
        // backgroundColor: colors.main4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray5,
        borderColor: colors.black,
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: -sizes.body*0.5,
        marginTop: sizes.body
    },
    RegisterButton: {
        color: colors.black,
        ...fonts.h5,
    }
})