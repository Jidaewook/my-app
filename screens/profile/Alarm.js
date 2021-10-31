import React, {useState} from 'react';
import {View, Text, SectionList, Switch, SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';

import {colors, fonts, sizes} from '../../consts';

const Alarm = () => {

    const alarmItem = ["공지사항","학습지","NCS","PSAT"]
    const [noticeToggle, setNoticeToggle] = useState(false);
    const [workbookToggle, setWorkbookToggle] = useState(false);
    const [ncsToggle, setNcsToggle] = useState(false);
    const [psatToggle, setPsatToggle] = useState(false);

    // const toggleSwitch = (title) => {
    //     switch title (
    //         case "공지사항": 
    //             setNoticeToggle(!noticeToggle)
    //             break
    //         case "학습지": 
    //             setWorkbookToggle(!workbookToggle)
    //             break
    //         case "NCS": 
    //             setNcsToggle(!ncsToggle)
    //             break
    //         case "PSAT": 
    //             setPsatToggle(!psatToggle)
    //             break
    //     )
    // }


    return (
        <SafeAreaView 
            style={styles.Container}
        >
            {/* {alarmItem.map(alarm => (
                <View
                    style={{
                        height: sizes.height/20,
                        width: sizes.width,
                        marginTop: sizes.header,
                        backgroundColor: colors.white, 
                        flexDirection: 'row'
                    }}
                >
                    <View style={{flexDirection: 'column', width: sizes.width * 0.3, marginLeft: sizes.sideLine}}>
                        <Text style={{marginTop: 10, ...fonts.h4, fontWeight: 'bold'}}>
                            {alarm}
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', width: sizes.width * 0.6}}>
                        <Switch 
                            trackColor={{false: colors.gray4, true: colors.main4}}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray2}
                            onValueChange={() => toggleSwitch}
                            // value={() => toggleSwitch("공지사항")}
                        />
                    </View>
                </View>
            ))}             */}
                <View
                    style={{
                        height: sizes.height/20,
                        width: sizes.width,
                        marginTop: sizes.header,
                        flexDirection: 'row'
                    }}
                >
                    <View style={{flexDirection: 'column', width: sizes.width * 0.3, marginLeft: sizes.sideLine}}>
                        <Text style={{marginTop: 10, ...fonts.h4, fontWeight: 'bold'}}>
                            공지사항
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', width: sizes.width * 0.6}}>
                        <Switch 
                            trackColor={{false: colors.gray4, true: colors.main4}}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray2}
                            onValueChange={(value) => setNoticeToggle(value)}
                            value={noticeToggle}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: sizes.height/20,
                        width: sizes.width,
                        marginTop: sizes.header,
                        flexDirection: 'row'
                    }}
                >
                    <View style={{flexDirection: 'column', width: sizes.width * 0.3, marginLeft: sizes.sideLine}}>
                        <Text style={{marginTop: 10, ...fonts.h4, fontWeight: 'bold'}}>
                            학습지
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', width: sizes.width * 0.6}}>
                        <Switch 
                            trackColor={{false: colors.gray4, true: colors.main4}}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray2}
                            onValueChange={(value) => setWorkbookToggle(value)}
                            value={workbookToggle}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: sizes.height/20,
                        width: sizes.width,
                        marginTop: sizes.header,
                        flexDirection: 'row'
                    }}
                >
                    <View style={{flexDirection: 'column', width: sizes.width * 0.3, marginLeft: sizes.sideLine}}>
                        <Text style={{marginTop: 10, ...fonts.h4, fontWeight: 'bold'}}>
                            NCS
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', width: sizes.width * 0.6}}>
                        <Switch 
                            trackColor={{false: colors.gray4, true: colors.main4}}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray2}
                            onValueChange={(value) => setNcsToggle(value)}
                            value={ncsToggle}
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: sizes.height/20,
                        width: sizes.width,
                        marginTop: sizes.header,
                        flexDirection: 'row'
                    }}
                >
                    <View style={{flexDirection: 'column', width: sizes.width * 0.3, marginLeft: sizes.sideLine}}>
                        <Text style={{marginTop: 10, ...fonts.h4, fontWeight: 'bold'}}>
                            PSAT
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', width: sizes.width * 0.6}}>
                        <Switch 
                            trackColor={{false: colors.gray4, true: colors.main4}}
                            thumbColor={colors.white}
                            ios_backgroundColor={colors.gray2}
                            onValueChange={(value) => setPsatToggle(value)}
                            value={psatToggle}
                        />
                    </View>
                </View>            
        </SafeAreaView>
    );
};

export default Alarm;

const styles = StyleSheet.create({
    Container: {
        backgroundColor: colors.white,
        flex: 1,
    }
})