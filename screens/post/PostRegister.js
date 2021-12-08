import React, {useState, useRef, useLayoutEffect} from 'react';
import {View, Text, ScrollView, TouchableWithoutFeedback, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/core';

import { API_URL } from '../../api/baseApi';
import { colors, fonts, sizes } from '../../consts';
import RegisterBtn from '../../component/common/RegisterBtn';
import HLine from '../../component/common/HLine';
import axios from 'axios';
import { PostScreen } from '..';



const PostRegister = ({route}) => {

    const navigation = useNavigation();

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [tag, setTag] = useState('');

    const [inquire, setInquire] = useState('게시판');
    const [list, setList] = useState('게시판 선택');

    const postCategory = ['자유게시판', '질문게시판', '합격수기'];

    // const route = useParams()

    // console.log("+++++", route)

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         tabBarVisible: false
    //     })
    // }, [navigation])

    const inquireMenu = (param) => {
        if(param === "자유게시판") {
            setInquire('bbs')
            setList("자유게시판")
        } else if (param === "질문게시판") {
            setInquire('qnas')
            setList("질문게시판")
        } else if (param === "합격수기") {
            setInquire('pass')
            setList('합격수기')
        }   
        closeBottom();
    }

    const refRBSheet = useRef();

    const openBottom = () => {
        refRBSheet.current.open();
    }

    const closeBottom = () => {
        refRBSheet.current.close();
    }

    const UselessTextInput = (props) => {
        return (
            <TextInput 
                {...props}
                editable
                maxLength={2000}
                multiline={true}
            />
        )
    }

    const registerPost = () => {
        const userData = {
            category: list,
            title: title,
            desc: desc,
            tag: tag
        }
        if(inquire === '게시판' || title === "" || desc === "") {
            return alert("빈 칸이 있으면 등록할 수 없습니다.")
        }
        axios   
            .post(`${API_URL}/bbs`, userData)
            .then(() => {
                Alert.alert(
                    "작성 글 등록",
                    "작성한 글을 등록하겠습니까?",
                    [
                        {
                            text: "취소",
                            style: "cancel"
                        },
                        {
                            text: "확인",
                            onPress: () => navigation.pop()
                        },
                    ],
                )
            })
            .catch(err => console.log(err))        
    }

    return (
        <SafeAreaView
            style={styles.screen}
        >
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
                contentContainerStyle={
                    styles.scrollView
                }
            >
                <View style={{flex: 1}}>
                    <TouchableOpacity 
                        style={styles.container}
                        onPress={() => openBottom()}
                    >
                        <Text 
                            style={styles.listMenu}
                        >
                            {list}
                        </Text>
                        <AntDesign 
                            name="down"
                            size={12}
                            color={colors.gray2}
                            style={styles.downButton}
                        />
                    </TouchableOpacity>
                    <RBSheet
                        ref={refRBSheet}
                        height={sizes.height/3.5}
                        closeOnDragDown={true}
                        closeOnPressMask={true}
                        customStyles={{
                            wrapper: {
                                backgroundColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            draggableIcon: {
                                backgroundColor: colors.gray1
                            },
                            container: {
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                                paddingHorizontal: sizes.body,
                                backgroundColor: colors.gray5
                            }
                        }}
                    >
                        <View style={styles.sheet}>
                            <Text style={styles.sheetText}>
                                게시판 선택
                            </Text>
                            <AntDesign 
                                name="close"
                                size={20}
                                color={colors.gray2}
                                style={{marginLeft: 'auto'}}
                                onPress={() => closeBottom()}
                            />
                        </View>
                        <HLine />
                        <View>
                            {postCategory.map(category => (
                                <>
                                    <Text
                                        style={styles.categoryText}
                                        onPress={() => inquireMenu(category)}
                                    >
                                        {category}
                                    </Text>
                                    <HLine />
                                </>
                            ))}
                        </View>

                    </RBSheet>
                    <View
                        style={{alignItems: 'center'}}
                    >
                        <View
                            style={styles.titleContainer}
                        >
                            <TextInput 
                                // editable
                                maxLength={100}
                                placeholder={' 제목을 입력해주세요'}
                                value={title}
                                style={styles.textInput}
                                onChangeText={text => (
                                    setTitle(text)
                                )}
                            />
                        </View>
                        <View
                            style={styles.descContainer}
                        >
                            <UselessTextInput 
                                placeholder={'내용을 입력해주세요'}
                                value={desc}
                                style={styles.textInput}
                                onChangeText={text => (
                                    setDesc(text)
                                )}
                            />
                        </View>
                        <View
                            style={styles.titleContainer}
                        >
                            <TextInput 
                                editable
                                maxLength={100}
                                placeholder={' 태그는 4글자 이내, 2개까지 입력 가능합니다.'}
                                style={styles.textInput}
                                value={tag}
                                onChangeText={text => (
                                    setTag(text)
                                )}
                            />

                        </View>
                        <TouchableOpacity
                            style={styles.uploadBtn}
                            onPress={() => RegisterBtn()}
                        >
                            <Text 
                                style={styles.uploadTxt}
                            >
                                첨부파일 추가
                            </Text>
                            <AntDesign
                                name="pluscircleo"
                                size={20}
                                style={styles.downButton}
                            />
                        </TouchableOpacity>
                        <Text
                            style={styles.uploadTxt}
                        >
                            첨부파일 등록은 최대 5MB, 사진은 3장까지 등록가능합니다.
                        </Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <View style={styles.footer}>
                <RegisterBtn 
                    title={'등록'}
                    containerStyle={styles.RegisterBtn}
                    textStyle={styles.RegisterBtnText}
                    onPress={registerPost}
                />
            </View>
        </SafeAreaView>
    );
};

export default PostRegister;

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.white,
        flex: 1
    },
    scrollView: {
        marginHorizontal: sizes.header,
        height: sizes.height*0.73,
    },  
    container: {
        paddingHorizontal: sizes.body,
        paddingVertical: sizes.body,
        borderWidth: 1,
        borderColor: colors.black,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: sizes.header,
        borderRadius: 5
    },  
    listMenu: {
        color: colors.black,
        fontWeight: 'bold',
        paddingLeft: sizes.width1
    },
    downButton: {
        opacity: 0.3
    },
    sheet: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: sizes.sideLine, 
        marginLeft: sizes.sideLine
    },  
    sheetText: {
        flex: 1, 
        fontSize: 16,
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    categoryText: {
        margin: sizes.body/2, 
        ...fonts.h5,
        fontWeight: 'bold', 
        color: colors.gray1
    },
    titleContainer: {
        width: sizes.width*0.93,
        height: sizes.sideLine * 2.5,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 5,
        marginTop: sizes.header,
        paddingVertical: sizes.header,
        paddingHorizontal: sizes.body/2,
        color: colors.black
    },
    titleStyle: {
        ...fonts.h6,
        color: colors.black
    },
    textInput: {
        paddingHorizontal: 12, 
        ...fonts.h5
    },
    descContainer: {
        width: sizes.width*0.93,
        height: sizes.height/3,
        borderWidth: 1,
        borderColor: colors.gray5,
        marginTop: sizes.header,
        paddingVertical: sizes.header,
        paddingHorizontal: sizes.body,
        borderRadius: 5,
    },
    uploadBtn: {
        marginVertical: sizes.header,
        paddingHorizontal: sizes.body,
        paddingVertical: sizes.body,
        borderWidth: 1,
        borderColor: colors.gray5,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: sizes.width*0.93
    },  
    uploadTxt: {
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.gray4,
        paddingLeft: sizes.width1,
        ...fonts.h1
    },  
    footer: {
        alignItems: 'center',
        margin: sizes.sideLine,
    },
    RegisterBtn: {
        backgroundColor: colors.gray5,
        borderColor: colors.black,
        borderRadius: 10,
        width: sizes.width*0.95,
        
    },
    RegisterBtnText: {
        color: colors.gray2,
        fontWeight: 'bold',
        ...fonts.h5
    }

})