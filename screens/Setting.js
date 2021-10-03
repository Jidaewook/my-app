import React, {useState} from 'react';
import {VAsyncStorage, TouchableOpacity, SectionList, SafeAreaView, View, Alert, Text, StyleSheet} from 'react-native';
import SettingSection from '../component/common/SettingSection';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import * as Linking from 'expo-linking';

import { API_URL } from '../api/baseApi';
import { colors, fonts, sizes } from '../consts';
import { menuItem } from '../consts';

const Setting = () => {
    const navigation = useNavigation();
  
    const movieScreen = (a) => {
        navigation.navigate(a)
    };

    const openOnPressMail = () => {
        Linking.openURL("mailto:dw4157@naver.com")
            .then((supported) => {
                if (supported) {
                return Linking.openURL(url)
                    .catch(() => null);
                }
            });
    }

    const [userData, setUserData] = useState({});
    const [isEnabled, setIsEnabled] = useState(false);
  
    const getUserData = async () => {
    // const token = await AsyncStorage.getItem('token')
    // const headers = {
    //   'Authorization': 'Bearer ' + token
    // }

    // try {
    //   axios 
    //     .get(`${API_URL}`, {headers: headers})
    //     .then(data => {
    //       setUserData(data.data)
    //     })
    //     .catch(err => {
    //       alert(err)
    //     })

    // } catch(e) {
    //   alert(e)
    // } finally {

    // }
    } 
    const logOutHandler = () => {
    // dispatch(logOut())
    }

return (
    <SafeAreaView style={styles.safeAreaView}>
      <SectionList
        sections={menuItem}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={styles.itemBox}
            onPress={() => {
              switch (item.title) {
                case "서비스문의", "오류신고", "구독문의" :
                  openOnPressMail();
                  break
                case "로그아웃" :
                  alert("로그아웃 하시겠습니까?")
                  break
                case "탈퇴문의" : 
                  alert("탈퇴하시겠습니까?")
                  break
                default :
                  movieScreen(item.screen)
                  break
              }
            }}
          >
            <View style={styles.icon}>
              <AntDesign name={item.icon} size={14} />
            </View>
            <View style={styles.item}>
              <Text style={styles.item}> 
                {item.title}
              </Text>
            </View>
            <View style={styles.right}>
              {
                item.title === '버전정보' ? (
                  <Text style={styles.settingText}>1.0.0</Text>
                ) : (
                  item.title === '      ' ? (
                    <Text></Text>
                  ) : (
                  <AntDesign name="right" size={14} color="gray" />
                ))
              }
              
            </View>
          </TouchableOpacity> 
        )}
        renderSectionHeader={({section}) => (
          <SettingSection
            title={section.title}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
    
  );
};

export default Setting;

const styles = StyleSheet.create({
    safeAreaView: {
        backgroundColor: colors.white
    },
    container: {
      flex: 1,
      paddingTop: sizes.sideLine,
    },
    sectionHeader: {
      height: sizes.header,
      ...fonts.h5,
      fontWeight: 'bold',
      color: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionList: {
      marginLeft: sizes.sideLine,
      width: '100%',
      justifyContent: 'center'
    },
    itemBox: {
      paddingLeft: sizes.sideLine,
      height: sizes.headerTop,
      ...fonts.h3,
      backgroundColor: 'white',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    item: {
      width: '75%',
      alignItems: 'flex-start',
      ...fonts.h5,
      justifyContent: 'center'
    },
    icon: {
      width: '10%',
      marginLeft: sizes.sideLine,
      marginRight: -sizes.body,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    right: {
      width: '15%',
      marginLeft: sizes.sideLine,
      justifyContent: 'center'
    },
    settingText: {
        marginLeft: -sizes.sideLine
    }
});