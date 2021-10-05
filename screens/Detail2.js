import axios from 'axios';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, TextInput, ScrollView, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {colors, sizes, fonts} from '../consts';
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

const Detail2 = ({route}) => {

    const navigation = useNavigation();

    const {id, isNot, title} = route.params;

    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [text, onChangeText] = useState('내용이 없습니다.');

    const getDetail = async (detailId) => {
        try {
            const {data} = isNot 
            ? await axios.get(`/notice/${detailId}`)
            : await axios.get(`/bbs/${detailId}`)
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
        getDetail(id)
    })

    const renderComment = ({item}) => {
        return (
            <View style={styles.CommentContainer}>
                {comments.map(item => 
                    <View
                        style={styles.CommentView}
                    >
                        <Text style={styles.CommentName}>
                            {item.name.slice(0,5)}
                        </Text>
                        <Text style={styles.CommentFirst}>
                            {item.comment}
                        </Text>
                        <View style={styles.info}>
                            <Text style={styles.CommentDate}>
                                {item.date}
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
        <SafeAreaView style={styles.Container}>
            <ScrollView style={[styles.Container]} contentContainerStyle={styles.MainScroll}>
                <Image 
                    source={require('../assets/profile/profile_Back.jpeg')}
                    style={styles.Image}
                />
                <View>
                    <Text style={styles.MainTitle}>
                        {detail.title}
                    </Text>
                    <Text style={styles.MainDesc}>
                        {detail.desc}
                    </Text>
                </View>
                <HLine />
                <View style={styles.MainView}>
                    <View>
                        <Text style={styles.CommentTitle}>
                            댓글
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput 
                                style={styles.CommentInput}
                                value={text}
                                onChangeText={onChangeText}
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
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

export default Detail2;

const styles = StyleSheet.create({
    
    Container: {
        backgroundColor: colors.white,
        marginVertical: sizes.zero,
        // marginHorizontal: sizes.sideLine,        
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
        height: '230%', 
        paddingBottom: sizes.header, 
        marginTop: sizes.header
    },
    CommentContainer: {
        height: '180%'
    },  
    CommentView: {
        borderWidth: 0.5,
        borderColor: colors.white,
        marginTop: 5
    },
    CommentTitle: {
        marginTop: sizes.headerTop,
        marginLeft: sizes.sideLine,
        ...fonts.subTitle,
        fontWeight: 'bold',
        width: '40%'
    },
    CommentDesc: {
        marginTop: sizes.header, 
        marginHorizontal: sizes.sideLine, 
        color: colors.gray2
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
        marginVertical: sizes.bottom,
        marginHorizontal: sizes.sideLine,
        ...fonts.h4,
        width: '85%'
    },
    CommentName: {
        marginVertical: sizes.bottom,
        marginHorizontal: sizes.sideLine,
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
    likeCount: {
        marginLeft: sizes.sideLine,
        marginTop: sizes.header,
        justifyContent: 'center',
        width: '10%',
    },
    likeBtn: {
        marginLeft: sizes.sideLine,
        marginTop: sizes.header,
        justifyContent: 'center',
        width: '5%',
    }, 
    ImageView: {
        width: '100%',
        height: sizes.height * 0.3
    },
    Image: {
        width: sizes.width,
        height: sizes.height * 0.3,
        resizeMode: 'contain'

    }
});