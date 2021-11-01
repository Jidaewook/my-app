import React, {useState, useLayoutEffect, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, ScrollView, ActivityIndicator, FlatList, ImageBackground} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import Moment from 'react-moment';
import axios from 'axios';

import {API_URL} from '../../api/baseApi';
import { colors, sizes, fonts } from '../../consts';

axios.defaults.baseURL = `${API_URL}`

const moreScreen = () => {


    const route = useRoute()
    const {title, isNcs} = route.params

    console.log(title)

    const navigation = useNavigation();
    const NcsCate = ['전체강의', '수리능력', '학습지', '모듈과목', '썰방'];
    const PsatCate = ['전체강의', '언어논리', '자료해석', '상황판단'];
    const [active, setActive] = useState('전체강의');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const nowTime = Date.now();

    const [filteredData, setFilteredData] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    })

    const getData = async() => {

        const {data} = isNcs 
        ? 
        await axios.get(`/ncs/`)
                    .then(res => {
                        setData(res.data.results)
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log(err)
                    })
        : await axios.get(`/psat/`)
                    .then(res => {
                        setData(res.data.results)
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log(err)
                    })
    }

    useEffect(() => {
        getData();
    }, [])

    const renderCategory = (category) => {
        const isActive = active === category;
        return (
            <TouchableOpacity
                key={`category-${category}`}
                onPress={() => handleCategory(category)}
                style={[styles.category, isActive ? styles.active : null]}
            >
                <Text style={{fontSize: sizes.h4, fontWeight: 'bold', color: isActive ? colors.main4 : colors.black }}>
                    {category}
                </Text>
            </TouchableOpacity>
        )
    }

    const handleCategory = category => {
        const filtered = data.filter(item => 
            item.genres_ids.includes(category.toLowerCase())  
        );
        setActive(category)
        setFilteredData(filtered)
    }

    return (
        <SafeAreaView style={{backgroundColor: colors.light, height: '100%'}}>
            <View style={styles.categories}>
                {isNcs ? (NcsCate.map(category => renderCategory(category))) : 
                (PsatCate.map(category => renderCategory(category)))
                }
                
            </View>
            <View style={{backgroundColor: colors.light}}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    // ListHeaderComponent={
                    //     <ScrollView
                    //         pagingEnabled={true}
                    //         horizontal
                    //         showsHorizontalScrollIndicator={false}
                    //         style={{
                    //             height: 150,
                    //             width: '100%'
                    //         }}
                    //     >
                    //         <Text>
                    //             광고영역
                    //         </Text>
                    //     </ScrollView>
                    // }
                    data={filteredData.length == 0 ? (data) || (data) : (filteredData)}
                    keyExtractor={(item) => item._id}
                    renderItem={({item}) => (
                        <View style={styles.cardView}>
                            <Image
                                source={require('../../assets/dummy/15.png')}
                                style={{width: '80%', height: '50%'}}
                            />
                            <Text style={styles.cardContent}>
                                {item.title.slice(0,10)}
                            </Text>
                            <Text style={styles.cardDesc}>
                                {item.desc.slice(0,15)}
                            </Text>
                            <TouchableOpacity 
                                style={styles.Btn}
                                onPress={() => navigation.navigate('Detail', {id: item._id})}
                            >
                                <Text style={styles.footer}>
                                    바로가기
                                </Text>
                            </TouchableOpacity>
                        </View>

                        // <View style={styles.cardView}>
                        //     <Image source={require('../../assets/favicon.png')} style={styles.bgImage} />
                        //     <View style={styles.itemView}>
                        //         <Text style={styles.cardContent}>
                        //             {item.title.slice(0,5)}
                        //         </Text>
                        //         <Text style={styles.cardDesc}>
                        //             {item.desc.slice(0,10)}
                        //         </Text>
                        //     </View>
                        //     <View style={styles.footer}>
                        //         <TouchableOpacity
                        //             onPress={() => navigation.navigate('Detail', {id: item._id})}
                        //         >

                        //             <Text
                        //                 style={{fontSize: 14, fontWeight: 'bold'}}
                        //             >
                        //                 바로가기
                        //             </Text>
                        //         </TouchableOpacity>
                        //     </View>
                            
                        // </View>
                    )}
                />
            </View>

        </SafeAreaView>
    );
};

export default moreScreen;

const styles = StyleSheet.create({
    category: {
        marginRight: 20,
        paddingVertical: 15
    },
    active: {
        borderBottomColor: colors.black,
        borderBottomWidth: 3
    },
    safeView: {

    },
    categories: {
        borderBottomColor: colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 1,
        marginHorizontal: 15,
        flexDirection: 'row'
    },
    bbsList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingRight: 10

    }, 
    // titleStyle: {
    //     fontSize: theme.sizes.h4,
    //     letterSpacing: -.72,
    //     fontWeight: '500',
    //     color: COLORS.black,
    //     paddingVertical: 10,
    //     marginHorizontal: 15
    // },
    badgePill: {
        fontSize: sizes.h5,
        letterSpacing: -0.6,
        color: colors.black,
        opacity: .5
    },
    bgImage: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        resizeMode: 'stretch', 
        marginTop: sizes.header, 
        justifyContent: 'center', 
        alignItems: 'center',
        opacity: 0.5
    },
    cardView: {
        height: sizes.cardView, 
        width: sizes.cardView, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: colors.gray4, 
        borderRightWidth: 1, 
        borderBottomWidth: 1, 
        borderRightColor: colors.gray6, 
        borderBottomColor: colors.gray6
    }, 
    cardContent: {
        ...fonts.h3, 
        fontWeight: 'bold', 
        marginTop: sizes.radius, 
        textAlign: 'left' 
    },
    cardDesc: {
        ...fonts.h5, 
        marginTop: sizes.bottom, 
        textAlign: 'left'
    },  
    Btn: {
        marginTop: sizes.radius, 
        width: '60%'
    },
    footer: {
        backgroundColor: colors.sub3, 
        color: colors.white, 
        textAlign: 'center', 
        height: sizes.sideLine, 
        alignItems: 'center'
    }
})