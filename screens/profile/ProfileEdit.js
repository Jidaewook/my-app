import React, {useState} from 'react';
import {Text,TouchableOpacity, View, Image, StyleSheet, ScrollView} from 'react-native';

import { colors, fonts, sizes } from '../../consts';

const ProfileEdit = () => {

    const [name, setName] = useState('관리자');
    const [institue, setInstitue] = useState('없음');
    const [area, setArea] = useState('대한민국');
    const [introduce, setIntroduce] = useState('2022년 상반기 토지주택공사에 합격하고 싶네요.자신 있는 과목은 의사소통이고,자신 없는 과목은 문제해결능력입니다.제가 토지주택공사에 입사하고 싶은 이유는, 횡령이 쉽기 때문입니다.');
    const [editing, setEditing] = useState(false);

    const toggleEdit = (name) => {
        setEditing(!editing ? name : null );
    }



    return (
        <ScrollView
            style={styles.Container}
        >
            <View 
                style={styles.ContainerView}
            >
                <Text style={styles.ImageContainer}>
                    프로필 사진
                </Text>
                <TouchableOpacity style={styles.ImageBtn}>
                    <Image 
                        source={require('../../assets/profile/profile_sample.jpeg')}
                        style={styles.avatar}
                    />  
                </TouchableOpacity>
            </View> 
            <View style={styles.TextView}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TextContainer}>
                        닉네임
                    </Text>
                </View>
                <View style={styles.TitleContainer}>
                <Text style={styles.ContentContainer}>
                    {name}
                </Text>
                <TouchableOpacity style={styles.EditBtn}>
                    <Text style={styles.EditContainer}>
                        Edit
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
            <View style={styles.divider} />
            <View style={{marginTop: 20}}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TextContainer}>
                        선호 기관
                    </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                <Text style={styles.ContentContainer}>
                    {institue}
                </Text>
                <TouchableOpacity style={styles.EditBtn}>
                    <Text style={styles.EditContainer}>
                        Edit
                    </Text>
                </TouchableOpacity>
                </View>
            </View> 
            <View style={styles.divider} />
            <View style={{marginTop: 20}}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TextContainer}>
                        거주지
                    </Text>
                </View>
                <View style={styles.TitleContainer}>
                    <Text style={styles.ContentContainer}>
                        {area}
                    </Text>
                    <TouchableOpacity style={styles.EditBtn}>
                        <Text style={styles.EditContainer}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>  
            <View style={styles.divider} />
            <View style={styles.divider} />
            <View style={styles.Textdesc}>
                <View style={styles.TitleContainer}>
                    <Text style={styles.TextContainer}>
                        자기소개
                    </Text>
                </View>
                <TouchableOpacity style={styles.EditBtn}>
                    <Text style={styles.EditIntro}>
                        Edit
                    </Text>
                </TouchableOpacity>
                
            </View>
            
            <View style={styles.TitleContainer}>
                <Text style={styles.introduce}>
                    {introduce}
                </Text>
                
            </View>
        </ScrollView>
    );
};

export default ProfileEdit;

const styles = StyleSheet.create({
    Container: {
        marginHorizontal: sizes.sideLine
    },
    ContainerView: {
        flexDirection: 'row', 
        width: '100%', 
        marginTop: sizes.header, 
        alignItems: 'center'
    },
    ImageBtn: {
        alignItems: 'flex-end'
    },
    ImageContainer: {
        width: '81%',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        color: colors.gray,

    },
    TextView: {
        marginTop: sizes.sideLine
    },
    TextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        color: colors.gray1,
        ...fonts.h4

    },
    TitleContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    EditBtn: {
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        marginLeft: -sizes.sideLine
    },
    EditContainer: {
        justifyContent: 'center',
        marginTop: sizes.header,
        ...fonts.h5,
        color: colors.gray1
    },

    ContentContainer: {
        width: '85%',
        justifyContent: 'center',
        marginTop: sizes.header,
        marginHorizontal: sizes.sideLine,
        ...fonts.h3,
        fontWeight: 'bold',
        color: colors.gray2
    },
    
    avatar: {
        width: sizes.profileAvatar,
        height: sizes.profileAvatar,
        borderRadius: 62,
        borderWidth: 0,
        alignItems: 'flex-end'
    },
    avatarContainer: {
        position: 'relative',
        marginTop: -sizes.header,
        alignItems: 'center'
    },
    introduce: {
        ...fonts.h5,
        borderColor: colors.gray5,
        fontWeight: '400',
        justifyContent: 'center',
        marginTop: sizes.header,
        marginRight: sizes.sideLine
    },
    divider: {
        width: '95%',
        borderWidth: 0.3,
        marginTop: sizes.header,
        borderColor: colors.white
    }, 
    Textdesc: {
        flexDirection: 'row', 
        marginTop: sizes.header
    }, 
    SubIntro: {
        ...fonts.h5, 
        marginLeft: sizes.sideLine, 
        color: colors.gray
    },
    EditIntro: {
        justifyContent: 'center',
        ...fonts.h5,
        color: colors.gray1,
        marginLeft: -sizes.body
    }
})