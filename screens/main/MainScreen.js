import React, {useState, useEffect} from 'react';
import {View, Text, Button, Alert, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import {colors, sizes, fonts} from '../../consts'
import {API_URL} from '../../api/baseApi'
import Section from '../../component/common/Section';
import Card from '../../component/common/Card';

const {width, height} = Dimensions.get("screen")

const MainScreen = () => {

    const navigation = useNavigation();
    const [searchModal, setSearchModal] = useState(false);
    const [ncs, setNcs] = useState([]);
    const [psat, setPsat] = useState([]);

    const getNcs = async() => {
        try {
            const {data} = await axios.get(`${API_URL}/ncs`)
            setNcs(data.results)
            console.log(ncs)
        } catch (err) {
            console.log(err)
        }
    }

    const getPsat = async() => {
        try {
            const {data} = await axios.get(`${API_URL}/psat`)
            setPsat(data.results)
            console.log(psat)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getNcs()
        getPsat()
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: colors.white }}>
            <StatusBar 
                backgroundColor='black'
                barStyle={'light-content'}
            />
            <View style={styles.header}>
                <MaterialIcons 
                    name="sort" size={28} color={colors.white}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate("Notification")} 
                >
                    <MaterialIcons 
                        name="notifications-none" 
                        size={28} 
                        color={colors.white} 
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    backgroundColor: colors.main4,
                    height: 120,
                    paddingHorizontal: 20
                }}
            >
                <View style={{flex: 1}}>
                    <Text style={styles.headerTitle}>PASSME</Text>
                    <Text style={styles.headerTitle}>Explorer Wisdom</Text>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={searchModal}
                        onRequestClose={()=> {
                            Alert.alert("모달을 닫습니다")
                            setSearchModal(!searchModal)
                        }}
                    >
                        <View style={styles.centerModal}>
                            <View style={styles.modalView}>
                                <Text style={{color: "black"}}>
                                    서치 모달
                                </Text>
                                <TouchableOpacity
                                    style={[styles.sectionTitle]}
                                    onPress={() => setSearchModal(!searchModal)}
                                >
                                    <Text>
                                        모달 닫기
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity 
                        style={styles.inputContainer}
                        onPress={() => setSearchModal(true)}
                    >
                        <MaterialIcons name="search" size={28} />
                        <TextInput 
                            placeholder="Search Contents"
                            style={{color: 'gray'}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{height: 30}} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.group}>
                    <View style={{display: 'flex'}}>
                        <Section title={"주목! NCS"}>
                            {ncs.map(i => (
                                <Card 
                                    item={i}
                                    full
                                    style={{marginRight: sizes.base, width: 250}}
                                    goTo={() => navigation.navigate("Detail", {id: i._id, isNcs: true})}
                                />    
                            ))}
                        </Section>
                    </View>
                    <View>
                        <Section title={"주목! PSAT"}>
                            {psat.map(i => (
                                <Card 
                                    item={i}
                                    full
                                    style={{marginRight: sizes.base, width: 250}}
                                    goTo={() => navigation.navigate("Detail", {id: i._id, isNcs: false})}
                                />    
                            ))}
                        </Section>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    header: {
      paddingVertical: 20,
      paddingTop: 50,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: colors.main4,
    },
    headerTitle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 23,
    },
    inputContainer: {
      height: 60,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 10,
      position: 'absolute',
      top: 90,
      flexDirection: 'row',
      paddingHorizontal: 20,
      alignItems: 'center',
      elevation: 12,
      shadowOpacity: 0.3,
      shadowRadius: 15,
    },
    // categoryContainer: {
    //   marginTop: 60,
    //   marginHorizontal: 20,
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    // },
    // iconContainer: {
    //   height: 60,
    //   width: 60,
    //   // backgroundColor: COLORS.secondary,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   borderRadius: 10,
    // },
    sectionTitle: {
      marginHorizontal: 20,
      marginVertical: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
    // cardImage: {
    //   height: 220,
    //   width: width / 2,
    //   marginRight: 20,
    //   padding: 10,
    //   overflow: 'hidden',
    //   borderRadius: 10,
    // },
    // rmCardImage: {
    //   width: width - 40,
    //   height: 200,
    //   marginRight: 20,
    //   borderRadius: 10,
    //   overflow: 'hidden',
    //   padding: 10,
    // },
    group: {
      paddingTop: sizes.base,
      paddingHorizontal: 20,
      marginTop: 50
    },
    centerModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
    },
    modalView: {
      width: width/6 * 5,
      height: height/5 * 4,
      margin: 20,
      backgroundColor: colors.white,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    }
})