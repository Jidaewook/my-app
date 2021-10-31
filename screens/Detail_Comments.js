import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, TextInput, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';


import { colors, sizes, fonts } from '../consts';
import { API_URL } from '../api/baseApi';
import HLine from '../component/common/HLine';


axios.defaults.baseURL = "http://localhost:8081"

const comments = [
    {
        comment: '1등',
        name: '유저네임',
        date: '2021-01-21'
    },
    {
        comment: '안녕하세요 댓글이벤트 당첨자입니다. 당첨된 댓글은 이메일을 보내주세요',
        name: '관리자',
        date: '2021-01-21'

    },
    {
        comment: '위에꺼 거짓말임',
        name: '나도 관리자는 아님',
        date: '2021-01-21'

    },
    {
        comment: '1등',
        name: '유저네임',
        date: '2021-01-21'
    },
    {
        comment: '안녕하세요 댓글이벤트 당첨자입니다. 당첨된 댓글은 이메일을 보내주세요',
        name: '관리자',
        date: '2021-01-21'

    },
    {
        comment: '1등',
        name: '유저네임',
        date: '2021-01-21'
    },
    {
        comment: '안녕하세요 댓글이벤트 당첨자입니다. 당첨된 댓글은 이메일을 보내주세요',
        name: '관리자',
        date: '2021-01-21'

    },
]

const Detail_Comments = ({route}) => {

    const navigation = useNavigation();
    
    const {title} = route.params;

    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [detail, setDetail] = useState({});

    const getDetail = async (detailId) => {
        try {
            const {data} = isNcs    
                // ? await axios.get(`${API_URL}/ncs/${detailId}`)
                ? await axios.get(`/ncs/${detailId}`)

                // : await axios.get(`${API_URL}/psat/${detailId}`)
                : await axios.get(`/psat/${detailId}`)

            setDetail(data.results)
        } catch (err) {
            console.log(err)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    })

    useEffect(() => {
        getDetail(id);
    }, {})

    const renderComment = ({item}) => {
        return (
            <View style={{marginLeft: sizes.body / 2}}>
                {comments.map(item => 
                <View style={styles.CommentContainer}>
                    <View
                        style={styles.CommentView}
                    >
                        <View style={styles.avatarContainer}>
                            <Image 
                                source={require('../assets/profile/profile_sample.jpeg')}
                                style={styles.avatar}
                            />
                        </View>
                        <View>
                            <Text style={styles.CommentName}>
                                {item.name.slice(0,5)}
                            </Text>
                            <Text style={styles.CommentFirst}>
                                {item.comment}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.moment}>
                            {moment(detail.createdAt).startOf('hour').fromNow()}
                        </Text>
                        <TouchableOpacity
                            onPress={() => alert('삭제하시겠습니까')}
                            style={styles.CommentAlert}
                        >
                            <Text style={styles.delete}>
                                삭제
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => alert('좋아요')}
                            style={styles.likeBtn}
                        >
                            <Feather 
                                name="thumbs-up"
                                size={20}
                                color={colors.black}
                            />
                        </TouchableOpacity>
                        <Text style={styles.likeCount}>
                                110
                        </Text>
                    </View>   
                    <HLine />
                </View>
                )}       
            </View>
           )
    }


    return (
        <SafeAreaView style={{backgroundColor: colors.white}}>
            <ScrollView style={styles.Container}>
                <View style={styles.CommentTitleFlex}>
                    <Text style={styles.CommentTitle}>
                        질문과 답변
                    </Text>
                </View>
                <Text style={styles.CommentDesc}>
                    질문에 대한 답변은 개인 쪽지로 드리거나 영상 콘텐츠로 제작되어 공개됩니다.
                </Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        style={styles.CommentInput}
                        value={text}
                        placeholder={'내용이 없습니다.'}
                        onChangeText={(input) => setText(input)}
                    />
                    <TouchableOpacity
                        style={styles.CommentBtn}
                        onPress={() => alert("등록하시겠습니까?")}
                    >
                        <Text style={styles.RegisterButton}>
                            등록
                        </Text>
                    </TouchableOpacity>
                </View>
                {renderComment(detail)}

            </ScrollView>
        </SafeAreaView>
        
    );
};

export default Detail_Comments;

const styles = StyleSheet.create({
    
    Container: {
        backgroundColor: colors.white,
        marginLeft: sizes.body,
        marginRight: sizes.body,
        marginHorizontal: sizes.sideLine,        
    },
    MainTitle: {
        marginLeft: sizes.sideLine,
        marginTop: sizes.header,
        ...fonts.title,
        color: colors.black,
    },
    MainDesc: {
        marginLeft: sizes.sideLine,
        marginRight: sizes.sideLine,
        marginTop: sizes.header,
        marginBottom: sizes.bottom,
        ...fonts.body,
        color: colors.gray2,
    }, 
    slogan: {
        ...fonts.title,
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.gray5,
        marginHorizontal: sizes.sideLine,
        marginVertical: sizes.bottom, 
        textAlign: 'center'
    },
    MainView: {
        height: sizes.height * 1.7
    },
    MainScroll: {
        height: sizes.height*1.7, 
        paddingHorizontal: sizes.body, 
    },
    CommentTitleFlex: {
        flexDirection: 'row'
    },
    CommentTitleFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CommentTitle: {
        marginTop: sizes.bottom,
        ...fonts.subTitle,
        fontWeight: 'bold',
        width: '40%'
    },
    CommentMore: {
        marginTop: sizes.header,
        ...fonts.h5,
        marginRight: sizes.body
    },
    CommentDesc: {
        marginTop: sizes.header, 
        marginHorizontal: sizes.sideLine, 
        color: colors.gray2
    },

    // Comment Screen
    CommentContainer: {
        marginLeft: 15
    },
    CommentView: {
        marginTop: 5,
        flexDirection: 'row'
    },
    
    // CommentCount: {
    //     marginTop: 15,
    //     marginLeft: 5,
    //     fontSize: 16,
    //     width: '68%'
    // },
    // CommentMore: {
    //     marginTop: 15,
    //     marginLeft: 5,
    //     fontSize: 16,
    //     color: themes.colors.gray
    // },
    CommentFirst: {
        marginHorizontal: sizes.sideLine,
        ...fonts.h4,
        width: sizes.width / 1.4
    },
    CommentName: {
        marginVertical: sizes.sideLine/2,
        marginHorizontal: sizes.body,
        ...fonts.h4,
        fontWeight: 'bold',
    },
    CommentInput: {
        width: '75%',
        height: sizes.buttonHeight,
        marginLeft: sizes.sideLine,
        marginTop: sizes.header,
        backgroundColor: colors.gray6
    },
    info: {
        flexDirection: 'row',
        marginLeft: sizes.sideLine * 2,
        marginTop: -5
    },
    CommentDate: {
        marginLeft: sizes.sideLine,
        marginTop: sizes.header, 
        justifyContent: 'center',
        width: '25%'
    }, 
    CommentAlert: {
        marginLeft: sizes.sideLine,
        marginTop: sizes.header,
        justifyContent: 'center',
        width: '40%'
    },  
    delete: {
        color: colors.gray3
    },
    RegisterButton: {
        height: sizes.header,
        marginTop: sizes.bottom,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CommentBtn: {
        borderWidth: 1,
        borderColor: colors.gray2,
        backgroundColor: colors.gray5,
        width: '10%',
        height: '70%', 
        marginLeft: sizes.sideLine,
        marginTop: sizes.header,
    },
    likeBtn: {
        marginTop: sizes.body,
        justifyContent: 'center',
    },
    likeCount: {
        marginLeft: sizes.body,
        marginTop: sizes.header,
        justifyContent: 'center',
    },
    // profile avatar
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
        marginTop: sizes.header,
        marginLeft: -sizes.sideLine
    },
    avatar: {
        width: sizes.sideLine * 2.5,
        height: sizes.sideLine * 2.5,
        borderRadius: 62,
        alignItems: 'center'

    },

    // moment
    momentView: {
        alignItems: 'flex-end', 
        marginRight: 20
    },
    moment: {
        marginTop: 15, 
        color: colors.gray2
    }
});