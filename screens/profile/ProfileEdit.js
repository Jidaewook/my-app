import React, {useState, useEffect} from 'react';
import {Text,TouchableOpacity, View, TextInput, Image, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { colors, fonts, sizes } from '../../consts';
import { API_URL } from '../../api/baseApi';

const ProfileEdit = () => {

    const [name, setName] = useState('');
    const [institue, setInstitue] = useState('없음');
    const [area, setArea] = useState('대한민국');
    const [introduce, setIntroduce] = useState('없음');
    const [editing, setEditing] = useState(false);

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
            setArea(data.area)
            setIntroduce(data.introduce)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getInfo();
    }, {})

    return (
        <ScrollView
            style={styles.Container}
        >
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
                <TextInput style={styles.ContentContainer}>
                    {name}
                </TextInput>
                
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
                    <TextInput style={styles.ContentContainer}>
                        {institue}
                    </TextInput>
                
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
                    <TextInput style={styles.ContentContainer}>
                        {area}
                    </TextInput>
                    
                </View>
            </View>  
            <View style={styles.divider} />
            <View style={styles.divider} />
            <View style={styles.Textdesc}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TextContainer}>
                        자기소개
                    </Text>
                </View>
                
            </View>
            
            <View style={styles.TitleContainer}>
                <TextInput style={styles.introduce} multiline={true} numberoflines={5}>
                    {introduce}
                </TextInput>
                
            </View>
        </ScrollView>
    );
};

export default ProfileEdit;

const styles = StyleSheet.create({
    Container: {
        marginHorizontal: sizes.sideLine
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
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.gray,

    },
    TextView: {
        marginTop: sizes.sideLine
    },
    TextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: colors.gray1,
        ...fonts.h4

    },
    TabContainer: {
        marginTop: 20
    },
    TitleContainer: {
        flexDirection: 'row',
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
        width: '85%',
        justifyContent: 'center',
        marginTop: sizes.header,
        marginHorizontal: sizes.sideLine,
        ...fonts.h3,
        fontWeight: 'bold',
        color: colors.gray2
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
    introduce: {
        ...fonts.h5,
        borderColor: colors.gray5,
        fontWeight: '400',
        justifyContent: 'center',
        marginTop: sizes.header,
        marginRight: sizes.sideLine,
        height: sizes.width /10,
        marginVertical: sizes.sideLine
    },
    divider: {
        width: '95%',
        borderWidth: 0.3,
        marginTop: sizes.header,
        borderColor: colors.white
    }, 
    Textdesc: {
        flexDirection: 'row', 
        marginTop: sizes.header
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
    }
})