import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {View, Text, Alert, StyleSheet, RefreshControl, TouchableOpacity, Dimensions, SafeAreaView, TextInput, ScrollView, Image} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';
import { AntDesign, Feather } from '@expo/vector-icons';
import moment from 'moment';
import { useSelector } from 'react-redux';

import { colors, sizes, fonts } from '../consts';
import Like from '../component/common/like';
import { API_URL } from '../api/baseApi';
import HLine from '../component/common/HLine';

const {width, height} = Dimensions.get('window');

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// axios.defaults.baseURL = "http://localhost:8081"

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
    
    const {id, isNcs, title} = route.params;

    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState([]);

    // userInfo
    const [userId, setUserId] = useState('');

    const [refreshing, setRefreshing] = useState(false);

    const { token } = useSelector(state => state.usersReducer);

    const config = {
        headers : {
            Authorization : "Bearer " + token 
        }
    }



    const getDetail = async (detailId) => {
       
        try {
            const {data} = isNcs    
                // ? await axios.get(`${API_URL}/ncs/${detailId}`)
                ? await axios.get(`/ncs/${detailId}`)
                // : await axios.get(`${API_URL}/psat/${detailId}`)
                : await axios.get(`/psat/${detailId}`)

            setDetail(data.results)
            setComments(data.results.comment)
            setLikes(data.results.likes)
            
        } catch (err) {
            console.log(err)
        }
    }

    const getLike = async () => {
        // if (likes.filter(l => l.user.toString() === userId).length > 0) {
        //     setLike(true)
        // } else {
        //     setLike(false)
        // }
        await likes.filter(l => l.user.toString() === userId).length > 0 
            ? (setLike(true)) 
            : (setLike(false))
    }

    const getUser = async() => {

        console.log(",,,......")
        try {
            // const data  = await axios.get(`${API_URL}/users/userinfo`, config)
            const {data} = await axios.get('http://localhost:8081/users/userinfo', config)
            
            // console.log('data----', data)
            setUserId(data._id)
            

        } catch(err) {
            console.log(err)
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => 
            getDetail(),
            setRefreshing(false)
        );
    }, []);

    const registerBtnTab = async (text) => {
        
        const newComment = {
            text: text
        }
        const {data} = isNcs 
            ? (await axios.post(`ncs/comment/${id}`, newComment, config)) 
            : (await axios.post(`psat/comment/${id}`, newComment, config))
        
        setText('')
        setComments(data.comment)
        onRefresh()
    }

    const likeBtnTab = async (like) => {
        console.log('before action', like)
        // like 
        //     ? await axios.post(`ncs/unlike/${id}`, userId)
        //     : await axios.post(`ncs/like/${id}`, userId)

        setLike(like => !like)
        console.log('after action', like)

        // setLikes(data.Likes)    
        // onRefresh() 
    }

    const onDeletePress = async (commentId) => {
        if (data.status !== 200) {
            alert("에러발생")
            return 
        } 
        const {data} = isNcs
            ? (await axios.delete(`ncs/comment/${id}/${commentId}`, config))
            : (await axios.delete(`psat/comment/${id}/${commentId}`, config))
        
        setComments(data.comment)
        onRefresh()
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    })

    useEffect(() => {
        getDetail(id);
        getUser()
        setLike(
            likes.filter(l => l.user.toString() === userId).length > 0 
                ? true
                : false
        )
        onRefresh()
    }, [])

    const renderComment = (item) => {
        return (
            <View>
                {comments.map(item => 
                    <View style={styles.CommentContainer}>
                         <View
                             style={styles.CommentView}
                         >
                            <View style={styles.avatarContainer}>
                                <Image 
                                    source={{uri: item.avatar}}
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.nameContainer}>
                                <View style={styles.nameView}>
                                    <Text style={styles.CommentName}>
                                        {item.name.slice(0,5)}
                                    </Text>
                                    <Text style={styles.moment}>
                                        {moment(item.date).startOf('hour').fromNow()}
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity 
                                        style={styles.dots}
                                        onPress={() => 
                                            Alert.alert(
                                                "삭제하시겠습니까?",
                                                "",
                                                [
                                                    {
                                                        text: '삭제하기', onPress: () => {
                                                            onDeletePress(item._id)
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
                                {item.text}
                            </Text>
                        </View>
                        {/* <View style={styles.info}>
                            <TouchableOpacity
                                // onPress={() => likeBtnTab()}
                                style={styles.likeBtn}
                            >
                                <AntDesign 
                                    name={like ? "heart" : "hearto"}
                                    size={16}
                                    color={colors.gray1}
                                />
                            </TouchableOpacity>
                            <Text style={styles.likeCount}>
                                    {item.like.length}
                            </Text>
                        </View>   */}
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
        <SafeAreaView style={styles.Container}>
            <View>
                <YoutubePlayer 
                    height={230}
                    play={true}
                    videoId={detail.url}
                />
            </View>
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
                <View style={styles.MainView}>
                    <View>
                        <Text style={styles.MainTitle}>
                            {detail.title}
                        </Text>
                        <View style={styles.momentView}>
                            <Text style={styles.moment}>
                                {moment(detail.createdAt).startOf('hour').fromNow()}
                            </Text>
                            <TouchableOpacity
                                // onPress={() => setLike((like) => !like)}
                                onPress={() => likeBtnTab(like)}
                                style={{flexDirection: 'row'}}
                            >
                                <AntDesign 
                                    name={like ? "heart" : "hearto"}
                                    size={16}
                                    color={colors.gray1}
                                />
                                <Text>
                                    {likes.length}
                                    {/* 123 */}
                                </Text>
                            </TouchableOpacity>
                        </View>
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
                    <View>
                        <View style={styles.CommentTitleFlex}>
                            <Text style={styles.CommentTitle}>
                                질문과 답변
                            </Text>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate("Detail_Comments", {title: "전체보기"})}
                            >
                                <Text style={styles.CommentMore}>
                                    더보기
                                </Text>
                            </TouchableOpacity>
                        </View>

                        
                        <Text style={styles.CommentDesc}>
                            질문에 대한 답변은 개인 쪽지로 드리거나 영상 콘텐츠로 제작되어 공개됩니다.
                        </Text>
                        <View style={{flexDirection: 'row', marginBottom: sizes.body}}>
                            <TextInput 
                                style={styles.CommentInput}
                                value={text}
                                placeholder={'내용이 없습니다.'}
                                onChangeText={(input) => setText(input)}
                            />
                            <TouchableOpacity
                                style={styles.CommentBtn}
                                onPress={() => registerBtnTab(text)}
                            >
                                <Text style={styles.RegisterButton}>
                                    등록
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <HLine />
                        {renderComment(comments)}
                        
                    </View>
                </View>
            </ScrollView>
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
        ...fonts.h2,
        fontWeight: 'bold',
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
        ...fonts.h2,
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
        justifyContent: 'space-between',
        marginTop: sizes.header,
    },
    CommentTitle:{
        ...fonts.h4,
        marginLeft: sizes.body,

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
    momentView: {
        justifyContent: 'flex-end',
        marginRight: sizes.body,
        marginTop: sizes.header,
        flexDirection: 'row'
    },
    moment: {
        color: colors.gray2,
        marginRight: sizes.body
    },
    dots: {
        marginLeft: 15
    },
    CommentDetail: {
        marginTop: sizes.body,
        ...fonts.h5,
        color: colors.gray1
    },

    info: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    
    likeCount: {
        marginLeft: sizes.body/2,
        marginRight: sizes.body/2,
        marginTop: sizes.body/3.5,
        justifyContent: 'center',
        color: colors.gray1,
        ...fonts.h4
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