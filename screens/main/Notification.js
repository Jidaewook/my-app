import React, {useState, useEffect} from 'react';
import {Text, View, Image, StyleSheet, ScrollView, SafeAreaView, FlatList, TouchableOpacity} from 'react-native';
import axios from 'axios';
// import Moment from 'react-moment';
// import moment from 'moment';


import { API_URL } from '../../api/baseApi';
import { colors, fonts, sizes } from '../../consts';
import HLine from '../../component/common/HLine';


const Notification = () => {

    const tabs = ['공지사항', '알림'];
    const [active, setActive] = useState('공지사항');
    const [notice, setNotice] = useState([]);
    const [alarm, setAlarm] = useState([]);
    const [filterData, setFilteredData] = useState([]);

    const getNotice = async () => {
        const {data} = await axios.get(`${API_URL}/notice`)
        setNotice(data.results)
        console.log('+++++++++', data.results.length)
    }

    const getAlarm = async () => {
        const {data} = await axios.get(`${API_URL}/alarm`)
        setAlarm(data.results)
        // console.log()
    }

    useEffect(() => {
        getNotice(),
        getAlarm()
    }, [])

    // const momentDate = (date) => {
    //     moment(date).format('L')
    // };

    const renderTab = (tab) => {
        const isActive = active === tab;

        return (
            <TouchableOpacity
                key={`tab-${tab}`}
                onPress={() => setActive(tab)}
                style={[styles.tab, isActive ? styles.active : null]}
            >
                <Text style={{fontSize: 15, fontWeight: 'bold', color: isActive ? colors.main4 : colors.gray2}}>
                    {tab}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <View style={styles.tabs}>
                {tabs.map(tab => renderTab(tab))}
            </View>
            {active === '공지사항' && (
                <ScrollView style={styles.scrollView}>
                    {notice.map(item => (
                        <>
                            <View style={styles.post} key={item._id}>
                                <View>
                                    <Text style={styles.title} >
                                        [{item.genres_ids[0]}]{" "}{item.title}
                                    </Text>
                                    {/* {item.genres_ids.map(g => (
                                        <View style={{paddingLeft: 10}}>
                                            <BadgePill 
                                                title={'#'+g}
                                                textStyle={[styles.badgePill, {paddingVertical: 5, paddingHorizontal: 10, opacity: 1 }]}
                                            />
                                        </View>
                                    ))} */}
                                    {/* <Moment 
                                        from={Date.now()} 
                                        element={Text} 
                                        style={{color: colors.gray2, fontSize: 12, marginTop: 10}}
                                    >
                                        {item.createdAt}
                                    </Moment> */}
                                </View> 
                                
                            
                            </View>
                            <View>
                                <HLine />

                            </View>
                        </>
                    ))}   
                    
                </ScrollView>
            )}
            {active === '알림' && (
                <ScrollView style={styles.scrollView}>
                {alarm.map(item => (
                    <>
                        <View style={styles.post} key={item._id}>
                            <View>
                                <Text style={styles.title} >
                                    [{item.genres_ids[0]}]{" "}{item.title}
                                </Text>
                                {/* {item.genres_ids.map(g => (
                                    <View style={{paddingLeft: 10}}>
                                        <BadgePill 
                                            title={'#'+g}
                                            textStyle={[styles.badgePill, {paddingVertical: 5, paddingHorizontal: 10, opacity: 1 }]}
                                        />
                                    </View>
                                ))} */}
                                {/* <Moment 
                                    from={Date.now()} 
                                    element={Text} 
                                    style={{color: colors.gray2, fontSize: 12, marginTop: 10}}
                                >
                                    {item.createdAt}
                                </Moment> */}
                            </View> 
                            
                        
                        </View>
                        <View>
                            <HLine />

                        </View>
                    </>
                ))}   
                
            </ScrollView>
            )}
            
        </SafeAreaView>

        // <ContentsList />

    );
};

export default Notification;

const styles = StyleSheet.create({
    tab: {
        marginRight: 20,
        paddingVertical: 15
    },
    active: {
        borderBottomColor: colors.main4,
        borderBottomWidth: 3
    },
    scrollView: {
        padding: 5, 
        backgroundColor: colors.white, 
        marginBottom: 100
    },
    safeView: {
        backgroundColor: colors.white,
    },
    tabs: {
        borderBottomColor: colors.gray4,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
    },
    post: {
        backgroundColor: colors.white,
        margin: 15,
        justifyContent: 'flex-end'
    },
    badgePill: {
        fontSize: 10,
        letterSpacing: -0.6,
        color: colors.gray3,
        opacity: .5
    },
    title: {
        fontSize: 14,
        color: colors.black,
        fontWeight: 'bold',
        // marginTop: 20,
        // marginHorizontal: 10
    },
    // itemBox: {
    //     // paddingLeft: 20,
    //     height: 70,
    //     fontSize: 18,
    //     // backgroundColor: COLORS.gray4,
    //     justifyContent: 'center',
    //     flexDirection: 'row'
    //   },
    //   item: {
    //     width: '75%',
    //     alignItems: 'flex-start',
    //     fontSize: 14,
    //     // justifyContent: 'center'
    //   },
})