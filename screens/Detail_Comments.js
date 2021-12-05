import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, TextInput, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { Feather, AntDesign } from '@expo/vector-icons';
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
    
    const {title, id} = route.params;

    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [detail, setDetail] = useState({});
    const [like, setLike] = useState(false);


    const getDetail = async (detailId) => {
        try {
            const {data} = isNcs    
                ? await axios.get(`${API_URL}/ncs/${detailId}`)
                // ? await axios.get(`/ncs/${detailId}`)

                : await axios.get(`${API_URL}/psat/${detailId}`)
                // : await axios.get(`/psat/${detailId}`)

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

    const registerBtnTab = async (id) => {
        
    }

    useEffect(() => {
        getDetail(id);
    }, {})

    const renderComment = ({item}) => {
        return (
            <View style={{marginLeft: sizes.body, marginTop: sizes.header}}>
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
                    <View style={styles.nameContainer}>
                        <View style={styles.nameView}>
                            <Text style={styles.CommentName}>
                                {item.name.slice(0,5)}
                            </Text>
                            <Text style={styles.moment}>
                                {moment(detail.createdAt).startOf('hour').fromNow()}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                                style={styles.dots}
                                onPress={() => onDeletePress()}
                            >
                                <Feather name="trash" size={18} color={colors.gray2} />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.dots}
                                onPress={() => onEditPress()}
                            >
                                <Feather name="edit" size={18} color={colors.gray2} />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
                <View>
                    <Text style={styles.CommentDetail}>
                        {item.comment}
                    </Text>
                </View>
                <View style={styles.info}>
                    
                    <TouchableOpacity
                        onPress={() => setLike(!like)}
                        style={styles.likeBtn}
                    >
                        <AntDesign 
                            name={like ? "heart" : "hearto"}
                            size={16}
                            color={colors.gray1}
                        />
                    </TouchableOpacity>
                    <Text style={styles.likeCount}>
                            110
                    </Text>
                </View>  
                <View
                    style={{marginTop: sizes.body}}
                >
                <HLine />
                </View> 
            </View>
                )}       
            </View>
           )
    }


    return (
        <SafeAreaView style={{backgroundColor: colors.white}}>
            <ScrollView style={styles.Container}>
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
                        onPress={() => registerBtnTab(id)}
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
    CommentDesc: {
        marginTop: sizes.header*2, 
        marginHorizontal: sizes.body, 
        color: colors.gray2
    },
    CommentContainer: {
        marginTop: sizes.header,
    },
    CommentView: {
        marginTop: 5,
        flexDirection: 'row'
    },
   
    nameContainer: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between'
    },  
    nameView: {
        marginLeft: sizes.body,
        justifyContent: 'space-between',
    },  
    CommentName: {
        ...fonts.h4,
        fontWeight: 'bold',
    },

//    TextInput
    CommentInput: {
        width: '75%',
        height: 40,
        marginLeft: sizes.body,
        marginTop: sizes.header,
        paddingLeft: sizes.body,
        backgroundColor: colors.gray6,
        color: colors.gray2
    },
    CommentBtn: {
        backgroundColor: colors.main4,
        width: '15%',
        height: 40, 
        marginLeft: sizes.body,
        marginTop: sizes.header,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RegisterButton: {
        height: sizes.header,
        textAlign: 'center',
        color: colors.white,
        fontWeight: 'bold',
    },
    
    info: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    dots: {
        marginLeft: 15
    },

    likeBtn: {
        justifyContent: 'center',
    },
    likeCount: {
        marginLeft: sizes.body/2,
        marginRight: sizes.body/2,
        marginTop: sizes.body/3.5,
        justifyContent: 'center',
        color: colors.gray1,
        ...fonts.h4
    },

    CommentDetail: {
        marginTop: sizes.body,
        ...fonts.h5,
        color: colors.gray1
    },


    // profile avatar
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    avatar: {
        width: sizes.sideLine * 2,
        height: sizes.sideLine * 2,
        borderRadius: 50,
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