import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ImageBackground, ScrollView, Image, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/core';

import { useSelector } from 'react-redux';

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
    const [name, setName] = useState('');
    const [institue, setInstitue] = useState('없음');
    const [area, setArea] = useState('대한민국');
    const [introduce, setIntroduce] = useState('없음');
    
    const {token} = useSelector(state => state.usersReducer);

    const config = {
        headers: {
            Authorization : "Bearer " + token
        }
    }

    const getInfo = async() => {
        try {
            // const {data} = await axios.get(`${API_URL}/users/userinfo`, config)
            const {data} = await axios.get('http://localhost:8081/users/userinfo', config)

            setName(data.name)
            setInstitue(data.institue)
            setArea(data.area)
            setIntroduce(data.introduce)
        } catch(err) {
            console.log(err)
        }
    }

    const getRecent = async() => {
        try {
            // const {data} = await axios.get(`${API_URL}/ncs`)
            const {data} = await axios.get('http://localhost:8081/ncs')
            setRecent(data.results)
        } catch(err) {
            console.log(err)
        }
    }

    const getLike = async() => {
        try{
            // const {data} = await axios.get(`${API_URL}/ncs`)
            const {data} = await axios.get('http://localhost:8081/ncs')
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
        getInfo()
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
                        style={styles.profileScroll}
                    >
                        <View style={styles.profileCard}>
                            <View style={styles.avatarContainer}>
                                <Image 
                                    source={require('../../assets/profile/profile_sample.jpeg')}
                                    style={styles.avatar}
                                />
                            </View>
                            <View style={styles.info}>
                                <View style={styles.status}>
                                    <View style={styles.statusView}>
                                        <Text style={styles.activeInfo}>
                                            {institue}
                                        </Text>
                                        <Text style={styles.infoDetail}>
                                            희망 기관
                                        </Text>
                                    </View>
                                    <View style={styles.statusView}>
                                        <Text style={styles.activeInfo}>
                                            137
                                        </Text>
                                        <Text style={styles.infoDetail}>
                                            좋아요
                                        </Text>
                                    </View>
                                    <View style={styles.statusView}>
                                        <Text style={styles.activeInfo}>
                                            37
                                        </Text>
                                        <Text style={styles.infoDetail}>
                                            즐겨찾기
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.nameView}>
                                <View style={styles.nameInfo}>
                                    <Text style={styles.nameInfoDetail}>  
                                        {name}
                                    </Text>
                                    <Text style={styles.addressDetail}>  
                                        {area}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.introduceView}>
                                <View style={styles.divider} />
                                <View style={styles.introduceView}>
                                    <Text style={styles.introduceDetail}>
                                        {introduce}
                                    </Text>
                                </View>
                                <View style={[styles.divider, {marginTop: sizes.header}]} />
                                <View style={styles.listView}>
                                    <Text style={styles.listTitle}>
                                        최근에 본 영상
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={styles.listMore}>
                                            전체보기
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true} style={styles.listScroll} showsHorizontalScrollIndicator={false}>
                                    {recent.map(item => (
                                        <TouchableOpacity
                                            key={`${item._id}`}
                                            onPress={() => navigation.navigate("Detail", {id: item._id, isNcs: true, title: item.title})} 
                                        >
                                            <Image 
                                                style={styles.listImage}
                                                source={{uri: item.poster}}
                                            >
                                            </Image>    
                                        </TouchableOpacity>
                                    ))} 
                                </ScrollView>
                                <View style={[styles.divider, {marginTop: sizes.header}]} />
                                <View style={styles.listView}>
                                    <Text style={styles.listTitle}>
                                        좋아요 한 영상
                                    </Text>
                                    <TouchableOpacity>
                                        <Text style={styles.listMore}>
                                            전체보기
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <ScrollView horizontal={true} style={styles.listScroll} showsHorizontalScrollIndicator={false}>
                                    {like.map(item => (
                                        <TouchableOpacity 
                                            key={`${item._id}`}
                                            onPress={() => navigation.navigate("Detail", {id: item._id, isNcs: true, title: item.title})} 
                                        > 
                                            <Image 
                                                style={styles.listImage}
                                                source={{uri: item.poster}}
                                                >
                                            </Image>   
                                        </TouchableOpacity>
                                    ))} 
                                </ScrollView>
                            </View>
                        </View>
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
    },
    editGear: {
        paddingTop: sizes.headerTop,
        marginBottom: -sizes.headerTop,
        marginHorizontal: sizes.sideLine,
        flexDirection: 'row',
        justifyContent: 'space-between'  
    },
    profileScroll: {
        width: '100%', 
        marginTop: '20%'
    },
    profileContainer: {
        width: '100%',
        height: '100%',
        zIndex: 1
    },
    profileBackground: {
        width: '100%',
        height: '50%',
    },
    profileCard: {
        display: 'flex',
        padding: sizes.sideLine,
        marginHorizontal: sizes.sideLine,
        marginTop: sizes.profilePic,
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
        marginTop: -sizes.profilePic,
        alignItems: 'center'

    },
    avatar: {
        width: sizes.profileCir,
        height: sizes.profileCir,
        borderRadius: 62,
        alignItems: 'center'

    },
    info: {
        paddingHorizontal: sizes.headerTop,
    },
    infoDetail: {
        ...fonts.h6, 
        color: colors.gray5
    },
    status: {
        marginTop: sizes.header, 
        paddingBottom: sizes.bottom, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    statusView: {
        alignItems: 'center'
    },  
    nameView: {
        flex: 1
    },
    nameInfo: {
        alignItems: 'center',
        marginTop: sizes.header,
    },
    nameInfoDetail: {
        ...fonts.title,
        color: colors.gray2, 
    },
    addressDetail: {
        ...fonts.subTitle,
        color: colors.gray5, 
        marginTop: sizes.header, 
        fontWeight: '800'
    },
    introduceView: {
        marginHorizontal: sizes.body,
        marginVertical: sizes.header
    },
    introduceDetail: {
        ...fonts.h5,
        color: colors.gray3, 
    },  
    activeInfo: {
        ...fonts.h3,
        color: colors.gray3, 
        fontWeight: 'bold', 
        marginVertical: sizes.header, 
    },
    divider: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.gray6
    },
    listView: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    listTitle: {
        fontWeight: 'bold', 
        ...fonts.h4,
        color: colors.gray3, 
        marginTop: sizes.header,
    },
    listMore: {
        color: colors.gray3, 
        ...fonts.h5, 
        marginTop: sizes.header, 
        
    },
    listScroll: {
        marginTop: sizes.header
    },
    listImage: {
        width: sizes.profileCir, 
        height: sizes.profileCir, 
        borderRadius: 10, 
        marginRight: sizes.sideLine, 
        marginTop: sizes.header
    }
});