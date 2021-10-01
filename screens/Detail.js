import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, TextInput, ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

import { colors, sizes, fonts } from '../consts';
import { API_URL } from '../api/baseApi';
import HLine from '../component/common/HLine';

const {width, height} = Dimensions.get('window');

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

const Detail = ({route}) => {
    
    const {id, isNcs} = route.params;
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [text, onChangeText] = useState('내용이 없습니다.');

    const getDetail = async (detailId) => {
        try {
            const {data} = isNcs    
                ? await axios.get(`${API_URL}/ncs/${detailId}`)
                : await axios.get(`${API_URL}/psat/${detailId}`)
            setDetail(data.results)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getDetail(id);
    }, {})

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
            <View>
                <YoutubePlayer 
                    height={230}
                    play={true}
                    videoId={detail.url}
                />
            </View>
            <View style={styles.MainView}>
                <View>
                    <Text style={styles.MainTitle}>
                        {detail.title}
                    </Text>
                    <Text style={styles.MainDesc}>
                        {detail.desc}
                    </Text>
                </View>
                <View>
                    <Text style={styles.slogan}>
                        각종 적성검사의 기본기를
                    </Text>
                    <Text style={styles.slogan}>
                        탄탄하게 다집니다!!
                    </Text>
                </View>
                <HLine />
                <ScrollView style={[styles.Container]} contentContainerStyle={styles.MainScroll}>
                    <View>
                        <Text style={styles.CommentTitle}>
                            질문과 답변
                        </Text>
                        <Text style={styles.CommentDesc}>
                            질문에 대한 답변은 개인 쪽지로 드리거나 영상 콘텐츠로 제작되어 공개됩니다.
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
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};

export default Detail;

const styles = StyleSheet.create({
    
    Container: {
        backgroundColor: colors.white,
        marginLeft: sizes.zero,
        marginRight: sizes.zero,
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
        height: height * 1.7
    },
    MainScroll: {
        height: '170%', 
        paddingBottom: sizes.header, 
        paddingHorizontal: sizes.body, 
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
        marginTop: sizes.bottom,
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
    }
});