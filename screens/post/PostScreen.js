import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {View, SafeAreaView, RefreshControl, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import ActionButton from 'react-native-action-button';

import { API_URL } from '../../api/baseApi';
import PostList from '../../component/common/PostList';
import TopMenu from '../../component/common/TopMenu';
import PostModal from '../../component/common/modal/Post';
import { colors, sizes, fonts } from '../../consts';
import { PostRegister } from '..';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const PostScreen = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    // 게시판 초기 탭 설정
    const tabs = ['전체', '자유게시판', '질문게시판', '합격수기'];
    const [active, setActive] = useState('전체');
    const [bbs, setBbs] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [postModal, setPostModal] = useState(false);

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => 
            getBbsData(),
            setRefreshing(false)

        )
    })

    const getBbsData = async() => {
        axios   
            .get(`${API_URL}/bbs`)
            // .get('http://localhost:8081/bbs')
            .then(bbss => {
                setBbs(bbss.data.results)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getBbsData();
        setFilteredData();
    }, [])

    // 포스트 모달
    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <TouchableOpacity
    //           onPress={() => setPostModal(true)}
    //           style={{marginRight: 10}}>
    //         <FontAwesome 
    //             size={24}
    //             color='black'
    //             name='pencil-square-o'
    //         />
    //         </TouchableOpacity>
    //       ),
    //     });
    //   }, [navigation]);

    const handleTab = tab => {
        const filtered = bbs.filter(item => 
            item.tag.includes(tab.toLowerCase())    
        );
        setActive(tab)
        setFilteredData(filtered)
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={[styles.tabs]}>
                {/* {tabs.map(tab => renderTab(tab))} */}
                {tabs.map(tab => {
                    return (
                        <TopMenu 
                            key={tab.toString()}
                            onPress={() => handleTab(tab)}
                            tab={tab}
                            isActive={active === tab}
                        />                        
                    )
                })}
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                {loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator color={colors.black} size={'large'} />
                    </View> 
                ) : (
                    <View style={{marginHorizontal: 16}}> 
                        {active === '전체' && <PostList datas={bbs}/>}
                        {active === '자유게시판' && <PostList datas={filteredData} /> }
                        {active === '질문게시판' && <PostList datas={filteredData} /> }
                        {active === '합격수기' && <PostList datas={filteredData} /> }                       
                    </View>
                )}  
            </ScrollView>
            <ActionButton buttonColor={colors.main4}>
                <ActionButton.Item
                    buttonColor={colors.main4}
                    title="Post"
                    onPress={() => {
                        navigation.push("PostRegister")
                    }}
                >
                    <Ionicons 
                        name="md-create"
                        style={styles.actionButton}
                    />
                </ActionButton.Item>
            </ActionButton>
        </SafeAreaView>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: colors.gray6,
    },
    tabs: {
        borderBottomColor: colors.gray5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: sizes.header,
        marginHorizontal: sizes.sideLine,
        flexDirection: 'row',
    },
    loading: {
        marginTop: 200, 
        justifyContent: 'center'
    },
    postList: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingVertical: 10, 
        paddingRight: 10
    },
    actionButton: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }

})
