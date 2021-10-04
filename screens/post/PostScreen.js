import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { colors } from '../../consts';

import PostList from '../../component/common/PostList';
import TopMenu from '../../component/common/TopMenu';

const PostScreen = () => {

    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);

    // 게시판 초기 탭 설정
    const tabs = ['전체', '자유게시판', '질문게시판', '합격수기'];
    const [active, setActive] = useState('전체');
    const [bbs, setBbs] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const getBbsData = async() => {
        axios   
            // .get("http://passme-env.eba-fkpnrszj.us-east-2.elasticbeanstalk.com/bbs")
            .get('http://localhost:8081/bbs')
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

    // 게시판 탭 설정

    const [postModal, setPostModal] = useState(false);

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
            >
                {loading ? (
                    <View style={{marginTop: 200, justifyContent: 'center'}}>
                        <ActivityIndicator color={colors.black} size={'large'} />
                    </View> 
                ) : (
                    <> 
                        {active === '전체' && <PostList datas={bbs}/>}
                        {active === '자유게시판' && <PostList datas={filteredData} /> }
                        {active === '질문게시판' && <PostList datas={filteredData} /> }
                        {active === '합격수기' && <PostList datas={filteredData} /> }
                        {/* {postModal && <PostModal />} */}
                       
                    </>
                )}  
            </ScrollView>
        </SafeAreaView>
    );
};

export default PostScreen;

const styles = StyleSheet.create({
    safeView: {
        flex: 1,
        backgroundColor: colors.gray6,
        paddingHorizontal: 10
    },
    tabs: {

        borderBottomColor: colors.gray5,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: 'row'
    },

    postList: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingVertical: 10, 
        paddingRight: 10
    },


})
