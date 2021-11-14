import axios from 'axios';
import React, {useEffect, useState, useLayoutEffect, useCallback} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, RefreshControl, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import { API_URL } from '../api/baseApi';
import {colors, sizes, fonts} from '../consts';

axios.defaults.baseURL = `${API_URL}`

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Detail2 = ({route}) => {

    const navigation = useNavigation();

    const {id, isNot, title} = route.params;

    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [text, onChangeText] = useState('내용이 없습니다.');

    const [refreshing, setRefreshing] = useState(false)
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => 
            getDetail(),
            setRefreshing(false)
        )
    })

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
            headerTitle: title.slice(0,25)
        })
    })

    useEffect(() => {
        getDetail(id)
    }, [])

    return (
        <SafeAreaView style={styles.Container}>
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
                <Image 
                    source={{uri: detail.poster}}
                    style={styles.Image}
                />
                <View style={{marginHorizontal: 25}}>
                    <Text style={styles.MainTitle}>
                        {detail.title}
                    </Text>
                    <Text style={{marginTop: 15, color: colors.gray4}}>
                        {moment(detail.createdAt).startOf('hour').fromNow()}
                    </Text>
                    <Text style={styles.MainDesc}>
                        {detail.desc}
                    </Text>
                   
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
    },
    MainTitle: {
        marginTop: sizes.headerTop,
        ...fonts.h2,
        fontWeight: 'bold',
        color: colors.black,
    },
    MainDesc: {
        marginTop: sizes.header,
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
        height: sizes.height/2.5,
        resizeMode: 'center',
    }
});