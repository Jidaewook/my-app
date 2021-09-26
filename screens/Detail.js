import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

import { colors, sizes, fonts } from '../consts';
import { API_URL } from '../api/baseApi';
import HLine from '../component/common/HLine';

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
            <View style={{height: '180%'}}>
                {comments.map(item => 
                    <View
                        style={{
                            borderWidth: 0.5,
                            borderColor: colors.white,
                            marginTop: 5
                        }}
                    >
                        <Text style={styles.CommentName}>
                            {item.name.slice(0,5)}
                        </Text>
                        <Text style={styles.CommentFirst}>
                            {item.comment}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.CommentDate}>
                                {item.date}
                            </Text>
                            <TouchableOpacity
                                onPress={() => alert('삭제하시겠습니까')}
                                style={{justifyContent: 'center'}}
                            >
                                <Text style={styles.CommentAlert}>
                                    삭제
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => alert('좋아요')}
                                style={{justifyContent: 'center', alignItems: 'flex-end', width: '40%'}}
                            >
                                <Feather 
                                    name="thumbs-up"
                                    size={20}
                                    color={colors.black}
                                />
                            </TouchableOpacity>
                            <Text style={{marginLeft: 10, marginTop: 5}}>
                                    20
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
            <View style={{height: 1200}}>
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
                <ScrollView style={[styles.Container]} contentContainerStyle={{height: '170%', paddingBottom: 30, paddingHorizontal: 10, marginTop: 15}}>
                    <View>
                        <Text style={styles.CommentTitle}>
                            질문과 답변
                        </Text>
                        <Text style={{marginTop: 20, marginHorizontal: 20, color: colors.gray2}}>
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
        marginLeft: 0,
        marginRight: 0,
        marginHorizontal: 20,        
    },
    MainTitle: {
        marginLeft: 30,
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
    },
    MainDesc: {
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 10,
        fontSize: 14,
        color: colors.gray2,
    }, 
    slogan: {
        fontSize: 25,
        fontWeight: '500',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.gray5,
        marginLeft: 25,
        marginTop: 10, 
        marginBottom: 10,
        marginRight: 25,
        textAlign: 'center'
    },
    CommentTitle: {
        marginTop: 15,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        width: '20%'
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
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 30,
        fontSize: 16,
        width: '85%'
    },
    CommentName: {
        marginTop: 15,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    CommentInput: {
        width: '75%',
        height: 35,
        marginLeft: 20,
        marginTop: 20,
        backgroundColor: colors.gray6
    },
    CommentDate: {
        marginLeft: 30,
        marginTop: 5, 
        justifyContent: 'center',
        width: '25%'
    }, 
    CommentAlert: {
        marginLeft: 10,
        marginTop: 6,
        justifyContent: 'center',
        width: 50
    },  
    RegisterButton: {
        height: 15,
        marginTop: 10,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    CommentBtn: {
        borderWidth: 1,
        borderColor: colors.gray2,
        backgroundColor: colors.gray5,
        width: 50,
        height: 35, 
        marginLeft: 10,
        marginTop: 20,
    },
});