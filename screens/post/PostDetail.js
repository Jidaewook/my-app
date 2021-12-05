import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {Alert, View, Text, StyleSheet, Modal, RefreshControl, KeyboardAwareScrollView, TouchableOpacity, Dimensions,  SafeAreaView, TextInput, ScrollView, Image} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { Feather, Entypo, AntDesign } from '@expo/vector-icons';
import moment from 'moment';

import { colors, sizes, fonts } from '../../consts/';
import { API_URL } from '../../api/baseApi';
import HLine from '../../component/common/HLine';

const {width, height} = Dimensions.get('window');

axios.defaults.baseURL = `${API_URL}`

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

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

const onDeletePress = () => {
    
    Alert.alert(
        "삭제하시겠습니까?",
        "삭제시 영구히 복구할 수 없습니다.",
        [
            { text: "삭제", onPress: () => {
                Alert.alert(
                    "정말 삭제하시겠습니까?",
                    "",
                    [
                    {
                        text: "취소",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    {
                        text: "삭제하기",
                        onPress: () => console.log("삭제되었습니다.")
                    },
                    ],
                );
            }},
            { text: "취소", onPress: () => console.log("OK Pressed"), style: "cancel"}
        ]
      );
};    

const onEditPress = () => {
    Alert.prompt(
        "수정하시겠습니까?",
        "",
        [
            {
                text: "수정",
                onPress: editContent => console.log("Edit: ", editContent)
            },
            {
                text: "취소",
                onPress: () => console.log("취소되었습니다."),
                style: "cancel"
            }
        ],
        "secure-text"
    );
}

const Detail = ({route}) => {

    const navigation = useNavigation();
    
    const {title, id} = route.params;

    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [replyLoading, setReplyLoading] = useState(true);
    const [text, setText] = useState('');

    const [reply, setReply] = useState(comments);
    const [modal, setModal] = useState(false)
    const [like, setLike] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => {
            getDetail(),
            getReply(),
            setRefreshing(false)
        })
    })

    const getDetail = async (detailId) => {
        try {
            const {data} = await axios.get(`/bbs/${detailId}`)
            setDetail(data.results)
            console.log(data.results)
        } catch (err) {
            console.log(err)
        }
    }

    const getReply = async () => {


    }
    

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    })

    useEffect(() => {
        getDetail(id);
        getReply();
    }, [])
    
    const renderComment = ({item}) => {
        return (
            <View style={{marginTop: sizes.header}}>
                <Text>
                    {reply.length === 0 
                        ? (
                            <Text style={{marginTop: 500, marginLeft: 20, ...fonts.h4, textAlign: 'center'}}>
                                등록된 댓글이 없습니다.
                            </Text>
                        ) 
                        : (
                            <View>
                                {reply.map(item => 
                                    <View style={styles.CommentContainer}>
                                        <View
                                            style={styles.CommentView}
                                        >
                                            <View style={styles.avatarContainer}>
                                                <Image 
                                                    source={require('../../assets/profile/profile_sample.jpeg')}
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
                                                    size={18}
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
                </Text>
            </View>
           )
    }



    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.MainView}>
                <ScrollView 
                    style={[styles.Container]} 
                    contentContainerStyle={styles.MainScroll}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }    
                >
                    <View>
                        <Text style={styles.MainTitle}>
                            {detail.title}
                        </Text>
                        <View style={{alignItems: 'flex-end', marginRight: 20}}>
                            <Text style={{marginTop: 15, color: colors.gray4}}>
                                {moment(detail.createdAt).startOf('hour').fromNow()}
                            </Text>
                        </View>
                        
                        <Text style={styles.MainDesc}>
                            {detail.desc}
                        </Text>
                    </View>
                    <View style={{marginTop: sizes.headerTop}}>
                        <HLine />
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
        color: colors.black,
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
        height: height * 1.2
    },
    MainScroll: {
        height: sizes.height*2,
        paddingHorizontal: sizes.body, 
    },
    CommentContainer: {
        marginTop: sizes.header,
        marginLeft: 15
    },  
    CommentView: {
        flexDirection: 'row',
        
    },
    CommentTitleFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CommentDesc: {
        marginTop: sizes.header, 
        marginHorizontal: sizes.sideLine, 
        color: colors.gray2
    },
    // TextInput
    CommentInput: {
        width: '75%',
        height: 40,
        marginLeft: sizes.sideLine,
        marginTop: sizes.header,
        backgroundColor: colors.gray6,
        color: colors.gray2,
        paddingLeft: 10
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
    

    // Comments
    avatarContainer: {
        position: 'relative',
        alignItems: 'center',
    },
    avatar: {
        width: sizes.sideLine * 2,
        height: sizes.sideLine * 2,
        borderRadius: 50,
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
    moment: {
        color: colors.gray2
    },
    dots: {
        marginLeft: 15
    },
    CommentDetail: {
        marginTop: sizes.body/2,
        marginLeft: 50,
        ...fonts.h5,
        color: colors.gray1
    },

    info: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    
    likeCount: {
        marginLeft: sizes.body,
        marginRight: sizes.body/2,
        marginTop: sizes.body/3,
        justifyContent: 'center',
        color: colors.gray1
    },
    likeBtn: {
        justifyContent: 'center',
    },
    
    inputContainer: {
        height: sizes.Input,
        width: sizes.width*0.9,
        backgroundColor: 'white',
        borderRadius: 10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: sizes.sideLine,
        alignItems: 'center',
        elevation: 12,
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },

    // Modal
    ModalTitle: {
        ...fonts.h1,
        justifyContent: 'flex-start',
        textAlign: 'left',
        // marginTop: sizes.headerTop,
        // marginLeft: sizes.sideLine
    },
    centerModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
        width: sizes.width,
        height: height/4,
        bottom: -height/2.5,
        backgroundColor: colors.white,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
        },
    inputView: {
        width: sizes.width,
        height: 50,
        flexDirection: 'row',
        marginTop: sizes.sideLine,
        justifyContent: 'center'
    },
    modalInput: {
        width: sizes.width*0.7,
        height: sizes.buttonHeight*1.5,
        backgroundColor: colors.gray6,
        borderRadius: 5,
        paddingLeft: 20
    },
    ModalBtn: {
        marginLeft: sizes.sideLine,
        backgroundColor: colors.main4,
        width: 50,
        height: sizes.buttonHeight*1.5,
        justifyContent: 'center',
        borderRadius: 5
    },
    ModalBtnText: {
        ...fonts.h3,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colors.white
    },
    targetTitle: {
        ...fonts.h2, 
        fontWeight: 'bold', 
        marginLeft: sizes.sideLine, 
        marginTop: sizes.sideLine
    },
    searchView: {
        flexDirection: 'row', 
        marginTop: sizes.header, 
        marginLeft: sizes.sideLine
    },
    targetBtn: {
        borderRadius: 20, 
        borderWidth: 1,
        borderColor: colors.gray4,
        marginLeft: 8,
        height: 40,
        width: 80,
        justifyContent: 'center',
        borderRadius: 20,
    },
    target: {
        color: colors.main4,
        ...fonts.h5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    searchResultTitle: {
        ...fonts.h2, 
        fontWeight: 'bold', 
        marginLeft: sizes.sideLine, 
        marginTop: sizes.sideLine
    },
    searchCount: {
        ...fonts.h5, 
        marginLeft: sizes.sideLine*2, 
        marginTop: sizes.header
    },
});