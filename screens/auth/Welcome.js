import React, {useRef, useState} from 'react';
import {View, Text, Animated, Dimensions, ImageBackground, Image, StyleSheet} from 'react-native';
import { colors, fonts, sizes } from '../../consts/theme';
import {useNavigation} from '@react-navigation/native';

import TextButton from '../../component/common/TextButton';
import {onboarding_screens} from '../../consts'

const {width, height} = Dimensions.get("window")

const Welcome = () => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef();

    const [currentIndex, setCurrentIndex] = useState(0);
    const navigation = useNavigation();
    const onViewChangeRef = useRef(({viewableItems, changed}) => {
        setCurrentIndex(viewableItems[0].index)
    }) 

    const Dots = () => {
        const dotPosition = Animated.divide(scrollX, width)

        return (
            <View style={styles.DotView}>
                {
                    onboarding_screens.map((item, index) => {
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [colors.gray4, colors.main4, colors.gray4],
                            extrapolate: "clamp"
                        })
                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [10, 30, 10],
                            extrapolate: "clamp"
                        })
                        return (
                            <Animated.View 
                                key={`dot-${index}`}
                                style={{
                                    borderRadius: 5, marginHorizontal: 6, width: dotWidth, height: 10, backgroundColor: dotColor
                                }}
                            />
                        )
                    })
                }           
            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View style={styles.FooterView}>
                <View style={styles.FooterDots}>
                    <Dots />
                </View>
                {currentIndex < onboarding_screens.length - 1 && 
                    <View style={styles.BtnView}>
                        <TextButton 
                            label="Skip"
                            buttonContainerStyle={styles.TextBtn}
                            labelStyle={{
                                color: colors.black,
                            }}
                            onPress={() => navigation.navigate("LoginScreen")}
                        />
                        <TextButton 
                            label="Next"
                            buttonContainerStyle={styles.NextBtn}
                            labelStyle={{
                                color: colors.white,
                            }}
                            onPress={() => {
                                flatListRef.current.scrollToIndex({
                                    index: currentIndex + 1,
                                    Animated: true
                                })
                            }}
                        />
                    </View>
                } 
                {
                    currentIndex == onboarding_screens.length - 1 && 
                    <View
                        style={styles.loginBtn}
                    >
                        <TextButton 
                            label="로그인 하기"
                            buttonContainerStyle={styles.NextBtn}
                            labelStyle={{
                                color: colors.white,
                            }}
                            onPress={() => navigation.navigate("LoginScreen")}
                        />
                    </View>
                }
            </View>
        )
    }

    return (
        <View style={{
            backgroundColor: colors.white,
            flex: 1
        }}>
            <Animated.FlatList 
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [
                        {nativeEvent: {contentOffset: {x: scrollX}}}
                    ], 
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewChangeRef.current}
                keyExtractor={(item) => `${item.id}`}
                renderItem={({item, index}) => {
                    return (
                        <View
                            style={styles.flatList}
                        >
                            <View
                                style={styles.topView}
                            >
                                <ImageBackground 
                                    source={item.backgroundImage}
                                    style={styles.imageView}
                                >
                                    <Image 
                                        source={item.bannerImage}
                                        resizeMode='contain'
                                        style={styles.imageDetail}
                                    />
                                </ImageBackground>
                            </View>
                            {/* Detail */}
                            <View
                                style={styles.viewDetail}
                            >
                                <Text
                                    style={styles.title}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={styles.desc}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            
            />
            {renderFooter()}
            
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    DotView: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: sizes.header
    },
    FooterView: {
        height: sizes.footerHeight, 
        paddingBottom: sizes.headerTop,
    },
    FooterDots: {
        flex: 1, 
        justifyContent: 'center'
    },
    FooterTextView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sizes.header,
        marginVertical: sizes.sideLine
    },
    TextBtn:{
        backgroundColor: null,
        marginLeft: sizes.header
    }, 
    BtnView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: sizes.sideLine,
        marginVertical: sizes.headerTop
    },
    NextBtn: {
        height: sizes.buttonHeight,
        width: sizes.footerHeight,
        borderRadius: 20,
    }, 
    loginBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: sizes.sideLine,
        marginVertical: sizes.headerTop
    },
    flatList: {
        width: width,
        height: height * 0.7
    },
    topView: {
        flex: 3
    },
    imageView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
        // marginTop: 0,
    }, 
    imageDetail: {
        width: width * 0.8,
        height: width * 0.8,
        marginBottom: -sizes.bigBtnHeight
    }, 
    viewDetail: {
        flex: 1,
        marginTop: sizes.headerTop,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: sizes.sideLine,
        height: sizes.bigBtnHeight,
        // backgroundColor: 'black'
        // paddingBottom: 20
    },
    title: {
        ...fonts.title,
        marginTop: sizes.headerTop
    },
    desc: {
        marginTop: sizes.headerTop,
        textAlign: 'center',
        color: colors.gray4,
        paddingHorizontal: sizes.sideLine,

    }
})