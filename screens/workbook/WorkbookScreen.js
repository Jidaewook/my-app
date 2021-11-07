import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Animated, Image, Platform, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import { colors, fonts, sizes } from '../../consts';
import { getWorkbook } from '../../api/workbookApi';

const SPACING = 10;
const {width, height} = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

// const Loading = () => (
//     <View
//         style={styles.loadingContainer}
//     >
//         <Text style={styles.paragraph}>Loading...</Text>
//     </View>
// )

const Backdrop = ({workbooks, scrollX}) => {
    return (
        <View style={{height: BACKDROP_HEIGHT, width, position: 'absolute' }} >
            <FlatList 
                data={workbooks.reverse()}
                keyExtractor={(item) => item.key + '-backdrop'}
                removeClippedSubviews={false}
                contentContainerStyle={{width, height: BACKDROP_HEIGHT}}
                renderItem={({item, index}) => {
                    if (!item.poster) {
                        return null;
                    } 
                    const translateX = scrollX.interpolate({
                        inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
                        outputRange: [0, width]
                    });
                    return (
                        <Animated.View
                            removeClippedSubviews={false}
                            style={{
                                position: 'absolute',
                                width: translateX,
                                height,
                                overflow: 'hidden'
                            }}
                        >
                            <Image 
                                source={{uri: item.poster}}
                                style={{
                                    width,
                                    height: BACKDROP_HEIGHT,
                                    position: 'absolute'
                                }}
                            />
                        </Animated.View>
                    );
                }}                
            />
            <LinearGradient 
                colors={['rgba(0, 0, 0, 0)', 'white']}
                style={{
                height: BACKDROP_HEIGHT,
                width,
                position: 'absolute',
                bottom: 0,
                }}
            />
        </View>
    );
}

export default function App() {
    const [workbooks, setWorkbooks] = useState([]);
    const navigation = useNavigation();

    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchData = async () => {
            const workbooks = await getWorkbook();
            setWorkbooks([{key: 'empty-left'}, ...workbooks, {key: 'empty-right'}])
        };

        if (workbooks.length === 0) {
            fetchData(workbooks);
        }
    }, [workbooks])

    // if (workbooks.length === 0) {
    //     return <Loading />
    // }

    return (
        <View style={styles.container}>
            <Backdrop workbooks={workbooks} scrollX={scrollX} />
            <StatusBar hidden />
            <Animated.FlatList 
                showsHorizontalScrollIndicator={false}
                data={workbooks}
                keyExtractor={(item) => item.key}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={styles.containerList}
                snapToInterval={ITEM_SIZE}
                snapToAlignment='start'
                onScroll={Animated.event(
                    [{nativeEvent: { contentOffset: {x: scrollX} }}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
                renderItem={({item, index}) => {
                    if (!item.poster) {
                        return <View style={styles.unItemView} />
                    }

                    const inputRange = [
                        (index - 2) * ITEM_SIZE,
                        (index - 1) * ITEM_SIZE,
                        index * ITEM_SIZE
                    ];

                    const translateY = scrollX.interpolate({
                        inputRange,
                        outputRange: [100, 50, 100],
                        extrapolate: 'clamp'
                    });

                    return (
                        <View style={styles.itemView}>
                            <Animated.View 
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2, 
                                    alignItems: 'center',
                                    transform: [{translateY}],
                                    backgroundColor: colors.white,
                                    borderRadius: 34,
                                    // width: 300,
                                    // height: 550
                                }}
                            >
                                <Image 
                                    source={{uri: item.poster}}
                                    style={styles.posterImage}
                                />
                                <Text style={styles.title} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                {/* <Genres /> */}
                                <Text style={styles.body} numberOfLines={3}>
                                    {item.description}
                                </Text>
                                <TouchableOpacity 
                                    onPress={() => navigation.navigate("Detail", {id: item.key, isNcs: true, title: item.title})}
                                    // onPress={() => console.log('item', item)}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            자세히 보기
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    );
                }}
            />
        </View>
)}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
      flex: 1,
    },
    containerList: {
        alignItems: 'center'
    },  
    unItemView: {
        width: EMPTY_ITEM_SIZE
    },
    itemView: {
        width: ITEM_SIZE
    },
    paragraph: {
        margin: sizes.sideLine,
        ...fonts.h4,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    posterImage: {
        width: '100%',
        height: ITEM_SIZE,
        resizeMode: 'stretch',
        borderRadius: 24,
        marginBottom: sizes.bottom,
    },
    badgePill: {
        ...fonts.h5, 
        letterSpacing: -0.6, 
        color: colors.gray2, 
        opacity: .5
    },
    button: {
        width: sizes.buttonWidth * 2,
        height: sizes.buttonHeight * 1.5,
        marginTop: sizes.headerTop / 1.5,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.gray4,
        // backgroundColor: colors.main4,
        justifyContent: 'center'
    },
    buttonText: {
        ...fonts.h4,
        color: colors.gray,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        ...fonts.h2,
        fontWeight: 'bold',
        color: colors.gray2,
        marginVertical: sizes.header
    },
    body: {
        ...fonts.body,
        color: colors.gray1,
        marginHorizontal: sizes.sideLine / 2

    }
});
  