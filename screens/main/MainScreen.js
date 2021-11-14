import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, RefreshControl, Button, Alert, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Dimensions, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import {colors, sizes, fonts} from '../../consts'
import {API_URL} from '../../api/baseApi'
import Section from '../../component/common/Section';
import Card from '../../component/common/Card';

const {width, height} = Dimensions.get("screen")

const searchCategory = [
    "NCS", "PSAT", "학습지", "게시판"
]

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout))
}

const data = [
    {
        "__v": 0,
        "_id": "60a9bc914517db0e7de2dad1",
        "comment": [],
        "desc": "문제해결능력 상황구성문제 중 위치추론 파트에 대한 기초 접근법입니다. ",
        "genres_ids": [
          "문제해결",
          "전체",
          "접근법",
          "상황구성",
          "위치추론",
        ],
        "like": [],
        "poster": "http://www.w3bai.com/w3css/img_lights.jpg",
        "title": "문제해결능력 상황구성_위치추론 기본강의",
        "url": "h03HjVWloQU",
      },
      {
        "__v": 0,
        "_id": "60a9bc914517db0e7de2dad1",
        "comment": [],
        "desc": "문제해결능력 상황구성문제 중 위치추론 파트에 대한 기초 접근법입니다. ",
        "genres_ids": [
          "문제해결",
          "전체",
          "접근법",
          "상황구성",
          "위치추론",
        ],
        "like": [],
        "poster": "http://www.w3bai.com/w3css/img_lights.jpg",
        "title": "문제해결능력 상황구성_위치추론 기본강의",
        "url": "h03HjVWloQU",
      },
      {
        "__v": 0,
        "_id": "60a9bc914517db0e7de2dad1",
        "comment": [],
        "desc": "문제해결능력 상황구성문제 중 위치추론 파트에 대한 기초 접근법입니다. ",
        "genres_ids": [
          "문제해결",
          "전체",
          "접근법",
          "상황구성",
          "위치추론",
        ],
        "like": [],
        "poster": "http://www.w3bai.com/w3css/img_lights.jpg",
        "title": "문제해결능력 상황구성_위치추론 기본강의",
        "url": "h03HjVWloQU",
      },
      {
        "__v": 0,
        "_id": "60a9bc914517db0e7de2dad1",
        "comment": [],
        "desc": "문제해결능력 상황구성문제 중 위치추론 파트에 대한 기초 접근법입니다. ",
        "genres_ids": [
          "문제해결",
          "전체",
          "접근법",
          "상황구성",
          "위치추론",
        ],
        "like": [],
        "poster": "http://www.w3bai.com/w3css/img_lights.jpg",
        "title": "문제해결능력 상황구성_위치추론 기본강의",
        "url": "h03HjVWloQU",
      },
]


const MainScreen = () => {

    const navigation = useNavigation();
    const [searchModal, setSearchModal] = useState(false);
    const [ncs, setNcs] = useState([]);
    const [psat, setPsat] = useState([]);
    const [text, setText] = useState('');
    const [on, setOn] = useState('false');
    const [ncsLoading, setNcsLoading] = useState(true);
    const [psatLoading, setPsatLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => 
            getNcs(),
            getPsat(),
            setRefreshing(false)

        );
    }, []);

    const getNcs = async() => {
        try {
            const {data} = await axios.get(`${API_URL}/ncs`)
            // console.log(data)
            // const {data} = await axios.get('http://localhost:8081/ncs')
            setNcs(data.results)
            setNcsLoading(false)
            console.log(ncs)
        } catch (err) {
            console.log(err)
            setNcsLoading(false)
        }
    }

    const getPsat = async() => {
        try {
            const {data} = await axios.get(`${API_URL}/psat`)
            // const {data} = await axios.get('http://localhost:8081/psat')
            setPsat(data.results)
            setPsatLoading(false)
        } catch (err) {
            console.log(err)
            setPsatLoading(false)
        }
    }

    useEffect(() => {
        getNcs()
        getPsat()
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar 
                backgroundColor='black'
                barStyle={'light-content'}
            />
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Notification")} 
                >
                    <MaterialIcons 
                        name="notifications-none" 
                        size={28} 
                        color={colors.white} 
                        style={styles.notice}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={styles.headerView}
            >
                <View style={styles.headerView}>
                    <Text style={styles.headerTitle}>PASSME</Text>
                    <Text style={styles.headerTitle}>Explorer Wisdom</Text>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={searchModal}
                        onRequestClose={()=> {
                            Alert.alert("모달을 닫습니다")
                            setSearchModal(!searchModal)
                        }}
                    >
                        <View style={styles.centerModal}>
                            <View style={styles.modalView}>
                                <View style={{flexDirection: 'row', justifyContent: 'center', width: sizes.width, marginTop: sizes.header}}>
                                    <Text style={styles.ModalTitle}>
                                        Search Contents
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => setSearchModal(!searchModal)}
                                        style={{marginLeft: 130}}
                                    >
                                        <MaterialIcons name="close" size={24} color="black"/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.modalInput}
                                        value={text}
                                        placeholder={'검색어를 입력해주세요.'}
                                        onChangeText={(input) => setText(input)}
                                    />
                                    <TouchableOpacity
                                        style={[styles.ModalBtn]}
                                        onPress={() => alert("검색하기")}
                                    >
                                        <Text style={styles.ModalBtnText}>
                                            검색
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <Text style={styles.targetTitle}>
                                        검색 카테고리
                                    </Text>
                                    <View style={styles.searchView}>
                                        {searchCategory.map(i => (
                                            <TouchableOpacity
                                                style={styles.targetBtn}
                                                // onPress={() => {!setOn}}
                                            >
                                                <Text
                                                    style={styles.target}
                                                >
                                                    {i}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <View style={{height: sizes.height*2}}>
                                        <Text style={styles.searchResultTitle}>
                                            검색 결과
                                        </Text>
                                        <Text style={styles.searchCount}>
                                            총 {data.length} 개
                                        </Text>
                                        <ScrollView
                                            refreshControl={
                                                <RefreshControl 
                                                    refreshing={refreshing}
                                                    onRefresh={onRefresh}
                                                />
                                            }
                                        >
                                            {data.map(i => (
                                                <>
                                                    <View style={styles.searchResultView}>
                                                        <View style={styles.searchResultInner}>
                                                            <View style={styles.searchTop}>
                                                                <View style={styles.searchGenres}>
                                                                    <Text style={styles.genresTitle}>
                                                                        {i.genres_ids[0]}
                                                                    </Text>
                                                                </View>
                                                                <View style={styles.likeBox}>
                                                                    <AntDesign name="heart" size={18} color="red" />
                                                                    <Text style={styles.likeCount}>
                                                                        {i.like.length}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={styles.searchResultContents}>
                                                                <Text style={styles.searchTitle}>
                                                                    {i.title}
                                                                </Text>
                                                                <Text style={styles.searchDesc}>
                                                                    {i.desc.slice(0, 100)}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity 
                        style={styles.inputContainer}
                        onPress={() => setSearchModal(true)}
                    >
                        <MaterialIcons name="search" size={28} />
                        <Text style={{color: 'gray'}}>Search Contents </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height: 30}} />
            <ScrollView 
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={styles.group}>
                    <View style={{display: 'flex'}}>
                        <Section 
                            title={"주목! NCS"} 
                            onPress={() => navigation.navigate("More", {title: "NCS 리스트", isNcs: true})} 
                        >
                            {ncs.length === 0 
                                ? (
                                    <View style={styles.emptyMedia}>
                                        <Text
                                            style={styles.emptyMediaText}
                                        >
                                            등록된 영상 없음
                                        </Text>
                                    </View>
                                ) 
                                : (
                                    <>
                                        {ncs.map(i => (
                                            <Card 
                                                key={`${i._id}`}
                                                item={i}
                                                full
                                                style={styles.cardView}
                                                goTo={() => navigation.navigate("Detail", {id: i._id, isNcs: true, title: i.title})}
                                                indicator={ncsLoading}
                                            /> 
                                        ))}
                                    </>
                                )
                            }
                        </Section>
                    </View>
                    <View>
                        <Section 
                            title={"주목! PSAT"} 
                            onPress={() => navigation.navigate("More", {title: "PSAT 리스트", isNcs: false})}
                            isNcs={false}
                        >
                            {psat.length === 0 
                                ? (
                                    <View style={styles.emptyMedia}>
                                        <Text
                                            style={styles.emptyMediaText}
                                        >
                                            등록된 영상 없음
                                        </Text>
                                    </View>
                                ) 
                                : (
                                    <>
                                        {psat.map(i => (
                                            <Card 
                                                key={`${i._id}`}
                                                item={i}
                                                full
                                                style={styles.cardView}
                                                goTo={() => navigation.navigate("Detail", {id: i._id, isNcs: false, title: i.title})}
                                                indicator={psatLoading}
                                            />  
                                        ))}
                                    </>
                                )
                            }
                        </Section>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.white
    },
    header: {
      paddingVertical: sizes.d1,
      paddingTop: sizes.headerTop,
      paddingHorizontal: sizes.sideLine,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.main4,
    },
    notice: {
        marginLeft: width - 70
    },
    headerView: {
        backgroundColor: colors.main4,
        height: height/7,
        paddingHorizontal: sizes.sideLine
    },
    headerTitle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: sizes.h1,
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
        height: height - 25,
        bottom: -100,
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
    group: {
        paddingTop: sizes.base,
        paddingHorizontal: sizes.sideLine,
        marginTop: sizes.headerTop
    },
    cardView: {
        marginRight: sizes.sideLine,
        width: width/1.5
    },
    SearchText: {
        width: '100%',
        height: sizes.buttonHeight,
        marginTop: sizes.headerTop,
        backgroundColor: colors.gray6,
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
    searchResultView: {
        paddingHorizontal: 20, 
        marginTop: 10
    },
    searchResultInner: {
        width: sizes.width*0.9, 
        borderWidth: 1, 
        borderColor: colors.gray5, 
        paddingHorizontal: 10
    },
    searchTop: {
        flexDirection: 'row', 
        marginTop: 20, 
        marginLeft: 10
    },
    searchGenres: {
        width: sizes.width*0.25, 
        height: 40, 
        justifyContent: 'center', 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: colors.gray4
    },
    genresTitle: {
        ...fonts.h5, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        color: colors.main4
    },
    likeBox: {
        width: sizes.width*0.5, 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    likeCount: {
        ...fonts.h5, 
        fontWeight: '700', 
        marginLeft: 10
    },
    searchResultContents: {
        marginTop: 20, 
        marginLeft: 10
    },
    searchTitle: {
        ...fonts.h4, 
        fontWeight: '600', 
        color: colors.gray1
    },
    searchDesc: {
        ...fonts.h5, 
        marginTop: 20, 
        color: colors.gray2, 
        marginBottom: 20
    },
    scrollContainer: {
        flex: 1,
        height: sizes.height*2,
        marginBottom: 200
    },
    emptyMedia: {
        justifyContent: 'center',
        alignItems: 'center',
        width: sizes.width,
    },  
    emptyMediaText: {
        flex: 1,
        textAlign: 'center',
        ...fonts.h3,
        marginTop: sizes.headerTop
    }

})