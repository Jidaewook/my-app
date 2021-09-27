import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';

import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/userSlice';

import { colors, fonts, sizes } from '../../consts';
import { API_URL } from '../../api/baseApi';

const viewItems = [
    {
        title: '제목1',
        image: require('../../assets/dummy/13.png')
    },
    {
        title: '제목2',
        image: require('../../assets/dummy/14.png')
    },
    {
        title: '제목3',
        image: require('../../assets/dummy/15.png')
    },
    
]


const ProfileScreen = () => {

    const navigation = useNavigation();

    const [recent, setRecent] = useState([]);
    const [like, setLike] = useState([]);

    const dispatch = useDispatch();
    
    const logOutHandler = () => {
        dispatch(logOut())
    }

    const getRecent = async() => {
        try {
            const {data} = await axios.get(`${API_URL}/ncs`)
            setRecent(data.results)
        } catch(err) {
            console.log(err)
        }
    }

    const getLike = async() => {
        try{
            const {data} = await axios.get(`${API_URL}/ncs`)
            setLike(data.results)
        } catch(err) {
            console.log(err)
        }
    }

    const goToEdit = (screen) => {
        navigation.navigate(screen)
    }

    useEffect(() => {
        getRecent()
        getLike()
      }, []);

    return (
        <View style={styles.profile}>
            <View>
                <ImageBackground
                    source={require('../../assets/profile/profile_Back.jpeg')}
                    style={styles.profileContainer}
                    imageStyle={styles.profileBackground}
                >
                    <View style={styles.editGear}>
                        <AntDesign name="edit" size={24} color={colors.gray6} onPress={() => goToEdit("ProfileEdit")} />
                        <AntDesign name="setting" size={24} color={colors.gray6} onPress={()=> goToEdit("Setting")} />
                    </View>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={{width: '100%', marginTop: '20%'}}
                    >
                        <View style={styles.profileCard}>
                            <View style={styles.avatarContainer}>
                                <Image 
                                    source={require('../../assets/profile/profile_sample.jpeg')}
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.info}>
                                <View style={{marginTop: 20, paddingBottom: 24, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.activeInfo}>
                                            LH
                                        </Text>
                                        <Text style={{fontSize: 12, color: colors.gray5}}>
                                            희망 기관
                                        </Text>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.activeInfo}>
                                            137
                                        </Text>
                                        <Text style={{fontSize: 12, color: colors.gray5}}>
                                            좋아요
                                        </Text>
                                    </View>
                                    <View style={{alignItems: 'center'}}>
                                        <Text style={styles.activeInfo}>
                                            37
                                        </Text>
                                        <Text style={{fontSize: 12, color: colors.gray5}}>
                                            즐겨찾기
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{display: 'flex'}}>
                                <View style={styles.nameInfo}>
                                    <Text style={{fontSize: 28, color: colors.gray2, fontWeight: '800'}}>  
                                        지대욱, 35
                                    </Text>
                                    <Text style={{fontSize: 16, color: colors.gray5, marginTop: 15, fontWeight: '800'}}>  
                                        경기도 부천, 대한민국
                                    </Text>
                                </View>
                            </View>
                            <View style={{marginTop: 20, marginBottom: 15}}>
                                <View style={styles.divider} />
                                <View style={{paddingTop: 15, }}>
                                    <Text style={{fontSize: 14, color: colors.gray3, textAlign: 'flex-start'}}>
                                        2022년 상반기 토지주택공사에 합격하고 싶네요.
                                        자신 있는 과목은 의사소통이고,
                                        자신 없는 과목은 문제해결능력입니다. 
                                        제가 토지주택공사에 입사하고 싶은 이유는, 횡령이 쉽기 때문입니다.
                                    </Text>
                                </View>
                                <View style={[styles.divider, {marginTop: 20}]} />
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, color: colors.gray3, marginTop: 15,}}>
                                        최근에 본 영상
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={{color: colors.gray3, fontSize: 12, marginTop: 20, marginRight: 5}}>
                                            전체보기
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true} style={{marginTop: 10}} showsHorizontalScrollIndicator={false}>
                                    {recent.map(item => (
                                        <>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate("Detail", {id: item._id, isNcs: true})} 
                                            >
                                                <Image 
                                                    style={{width: 100, height: 100, borderRadius: 10, marginRight: 10, marginTop: 10}}
                                                    source={{uri: item.poster}}
                                                >
                                                </Image>    
                                            </TouchableOpacity>
                                        </>
                                    ))} 
                                </ScrollView>
                                <View style={[styles.divider, {marginTop: 20}]} />
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, color: colors.gray3, marginTop: 15,}}>
                                        좋아요 한 영상
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={{color: colors.gray3, fontSize: 12, marginTop: 20, marginRight: 5}}>
                                            전체보기
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true} style={{marginTop: 10}} showsHorizontalScrollIndicator={false}>
                                    {like.map(item => (
                                        <TouchableOpacity 
                                            onPress={() => navigation.navigate("Detail", {id: item._id, isNcs: true})} 
                                        > 
                                            <Image 
                                                style={{width: 100, height: 100, borderRadius: 10, marginRight: 10, marginTop: 10}}
                                                source={{uri: item.poster}}
                                                >
                                            </Image>   
                                        </TouchableOpacity>
                                    ))} 
                                </ScrollView>
                            </View>
                        </View>
                            <Button 
                                onPress={() => logOutHandler()}
                                title={"로그아웃"}
                            />
                    </ScrollView>

                </ImageBackground>
            </View>
            
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    profile: {
        display: 'flex',
        marginTop: 0,
        
    },
    editGear: {
        paddingTop: 50,
        marginBottom: -80,
        marginLeft: 20,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'  
    },
    profileContainer: {
        width: '100%',
        height: '100%',
        padding: 0,
        zIndex: 1
    },
    profileBackground: {
        width: '100%',
        height: '50%',

    },
    profileCard: {
        display: 'flex',
        padding: 15,
        marginHorizontal: 15,
        marginTop: 65,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        backgroundColor: 'white',
        shadowColor: colors.black,        
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2
    },
    avatarContainer: {
        position: 'relative',
        marginTop: -80,
        alignItems: 'center'

    },
    avatar: {
        width: 124,
        height: 124,
        borderRadius: 62,
        borderWidth: 0,
        alignItems: 'center'

    },
    info: {
        paddingHorizontal: 40,

    },
    nameInfo: {
        alignItems: 'center',
        marginTop: 15,

    },
    activeInfo: {
        fontSize: 18, 
        color: colors.gray3, 
        fontWeight: 'bold', 
        marginTop: 4, 
        marginBottom: 10
    },
    divider: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray6
    }

});