import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { colors, fonts, sizes } from '../../consts';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';

import HLine from './HLine';

const PostList = ({datas}) => {

    const navigation = useNavigation();

    return (
        <View>
            {datas.length === 0
                ? (
                    <View style={styles.emptyMedia}>
                        <Text
                            style={styles.emptyMediaText}
                        >
                            등록된 게시물 없음
                        </Text>
                    </View>
                ) 
                : (
                    <>
                        {datas.map(data => (
                            <>
                                <TouchableOpacity
                                    key={`${data._id}`}
                                    onPress={() => navigation.navigate("PostDetail", {id: data._id, title: data.title})}
                                    style={styles.ListBtn}
                                >
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15}}>
                                        <View style={{width: '70%'}}>
                                            <View>
                                                <Text style={{fontSize: 14, color: colors.gray3}}>
                                                    
                                                    {`[${data.tag[0]}] PASSME`}
                                                </Text>
                                            </View>
                                            <View style={{marginTop: 5}}>
                                                <Text style={{...fonts.h4, fontWeight: '600'}}>
                                                    {data.title}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{alignItems: 'flex-end', width: '30%'}}>
                                            <View>
                                                <Text style={{color: colors.gray3}}>
                                                    {moment(data.createdAt).startOf('hour').fromNow()}
                                                </Text>
                                            </View>
                                            <View>
                                                <View 
                                                    style={{flexDirection: 'row', marginTop: 5}}
                                                >
                                                    <View 
                                                        style={{flexDirection: 'row', paddingHorizontal: 10}}
                                                    >
                                                        <AntDesign name="heart" size={16} color={colors.gray2} />
                                                        <Text 
                                                            style={{marginLeft: 5, ...fonts.h5, color: colors.gray2}}
                                                        >
                                                            50
                                                        </Text>
                                                    </View>
                                                    <View 
                                                        style={{flexDirection: 'row'}}
                                                    >
                                                        <MaterialCommunityIcons name="message-reply-text" size={16} color={colors.gray2} />
                                                        <Text 
                                                            style={{marginLeft: 5, ...fonts.h5, color: colors.gray2}}                                        
                                                        >
                                                            10
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <HLine />
                            </>
                        ))}
                    </>
                )
            }
        </View>
        
    );
};

export default PostList;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: colors.gray6, 
        flex: 1
    },
    ListBtn: {
        height: 60, 
        marginVertical: 10
    },
    ListContainer: {
        // marginHorizontal: 10
        // flexDirection: 'row', 
        // height: sizes.height/10,
    },
    postList: {
        justifyContent: 'space-between', 
        paddingVertical: sizes.header, 
    },
    postListDetail: {
        // width: sizes.width, 
        height: sizes.height/9, 
        marginTop: -sizes.sideLine,
        backgroundColor: 'red',
        // marginHorizontal: 0,
        // marginRight: -20
    },
    postListContainer: {
        // width: sizes.width,
        flexDirection: 'row', 
        marginHorizontal: 20
    },
    postListView: {
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        width: sizes.width / 1.5,
    },
    postListMap: {
        // paddingLeft: sizes.body,
    },
    badgePill: {
        // ...fonts.h5, 
        // letterSpacing: -0.6, 
        // color: colors.gray2, 
        // opacity: .5,
    },
    badgePillText: {
        paddingVertical: 8, 
        // paddingHorizontal: 10, 

        opacity: 1
    },
    momentView: {
        // width: sizes.width * 0.38,
        // alignItems: 'flex-end',
    },
    moment: {
        // paddingRight: sizes.sideLine * 2, 
        color: colors.gray3
    },
    DetailView: {
        flexDirection: 'row',
        // width: sizes.width
        marginHorizontal: 20
    },
    titleView: {
        // width: sizes.width * 0.70
    },  
    titleStyle: {
        ...fonts.h4,
        fontWeight: '500',
        color: colors.black,
        // marginLeft: sizes.sideLine
    },
    infoContainer: {
        // width: sizes.width * 0.3, 
        flexDirection: 'row',
        // marginHorizontal: -10,
        alignItems: 'flex-end'
    },
    infoView: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
        
    },
    postProperty: {
        // alignItems: 'flex-end'
        // marginLeft: sizes.body /2,
        // marginRight: sizes.sideLine
    }

})
