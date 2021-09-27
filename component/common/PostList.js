import React from 'react';
import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { colors, fonts, sizes } from '../../consts';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

import BadgePill from './BadgePill';

const PostList = ({datas}) => {

    const navigation = useNavigation();

    const goToPostDetail = () => {
        navigation.navigate("PostDetail", {id})
    }

    const {width, height} = Dimensions.get("window")

    return (
        <View
            style={{backgroundColor: colors.gray6}}
        >
            {datas.map(data => (
                <TouchableOpacity
                    key={data._id}
                    onPress={() => goToPostDetail(data._id)}
                    style={{height: height/13, marginTop: 10, marginBottom: 15}}
                >
                    <View style={{flexDirection: 'row', height: height/10, marginTop: 0 }}> 
                        <View>
                            <Image 
                                source={require('../../assets/dummy/car.png')}
                                style={{width: width/10, height: height/17, borderRadius: 1, opacity: 0.7}}
                            />
                        </View>
                        <View 
                            style={[styles.postList, {width: width*0.95, height: height/9, marginTop: -20}]}
                        >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View
                                    style={{flexDirection: 'row', justifyContent: 'flex-start'}}
                                >
                                    {data.tag.map(t => (
                                        <View key={t._id} style={{paddingLeft: 10}} >
                                            <BadgePill 
                                                title={"#"+t}
                                                textStyle={[styles.badgePill, {paddingVertical: 5, paddingHorizontal: 10, opacity: 1 }]}
                                            />
                                        </View>    
                                    ))}
                                </View>
                                <View style={{paddingRight: 40}}>
                                    {/* <Moment
                                        from={Date.now()}
                                        element={Text}
                                        style={{color: colors.gray2, fontSize: 12}}
                                    >
                                        {data.createdAt}
                                    </Moment> */}
                                </View>
                            </View>
                            <View stlye={{flexDirection: 'row'}}>
                                <Text style={[styles.titleStyle]}>
                                    {data.title}
                                </Text>
                                <View style={{width: '35%', flexDirection: 'row', justifyContent: 'flex-end', marginLeft: 200, marginTop: -25}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <AntDesign name="like2" size={16} color={colors.gray5} />
                                        <Text style={styles.postProperty}>
                                            50
                                        </Text>
                                    </View>
                                    <View style={{marginLeft: 10, flexDirection: 'row'}}>
                                        <MaterialCommunityIcons name="message-reply-text" size={16} color={colors.gray2} />
                                        <Text style={styles.postProperty}>
                                            10
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View
                        style={[{
                            width: '98%',
                            marginTop: -20,
                            height: 1,
                            backgroundColor: colors.gray5

                        }]}
                    />
                </TouchableOpacity>
            ))}
            
            
        </View>
    );
};

export default PostList;

const styles = StyleSheet.create({

    postList: {
        justifyContent: 'space-between', 
        paddingVertical: 10, 
        paddingRight: 10
    },
    badgePill: {
        ...fonts.h5, 
        letterSpacing: -0.6, 
        color: colors.gray2, 
        opacity: .5
    },
    badgeDate: {
        fontSize: 10, 
        letterSpacing: -0.6, 
        color: 'black', 
        opacity: .5,
        paddingRight: 10
    },
    titleStyle: {
        fontSize: 16,
        // letterSpacing: -.72,
        fontWeight: '500',
        color: colors.black,
        paddingVertical: 20,
        marginHorizontal: 15,
        width: '57%'
    },
    postProperty: {
        marginLeft: 5, 
        color: colors.black
    }

})
