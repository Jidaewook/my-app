import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, FlatList, Animated, Image, Platform, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import { colors } from '../../consts';
import { getWorkbook } from '../../api/workbookApi';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SPACING = 10;
const {width, height} = Dimensions.get('window');
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 0.65;

const Lodaing = () => {
    <View
        style={styles.loadingContainer}
    >
        <Text style={styles.paragraph}>Loading...</Text>
    </View>
}

const Backdrop = ({workbooks, scrollX}) => {
    return (
        <View>
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

    const goToDetail = (id) => {
        navigation.navigate("Detail", {id, isNcs: true})
    };
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

    if (workbooks.length === 0) {
        return <Loaging />
    }

    return (
        <View>
            <Backdrop />
            <StatusBar />
            <Animated.FlatList 
                showsHorizontalScrollIndicator={false}
                data={workbooks}
                keyExtractor={(item) => item.key}
                horizontal
                bounces={false}
                decelerationRate={Platform.OS === ios ? 0 : 0.98}
                renderToHardwareTextureAndroid
                contentContainerStyle={{alignItems: 'center'}}
                snapToInterval={ITEM_SIZE}
                snapToAlignment='start'
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                scrollEventThrottle={16}
                renderItem={({item, index}) => {
                    if (!item.poster) {
                        return <View style={{width: EMPTY_ITEM_SIZE}} />
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
                        <View style={{width: ITEM_SIZE}}>
                            <Animated.View 
                                style={{
                                    marginHorizontal: SPACING,
                                    padding: SPACING * 2, 
                                    alignItems: 'center',
                                    transform: [{translateY}],
                                    backgroundColor: colors.white,
                                    borderRadius: 34,
                                }}
                            >
                                <Image 
                                    source={{uri: item.poster}}
                                    style={styles.posterImage}
                                />
                                <Text style={{fontSize: 24}} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                {/* <Genres /> */}
                                <Text style={{fontSize: 12}} numberOfLines={3}>
                                    {item.desc}
                                </Text>
                                <TouchableOpacity onPress={() => goToDetail(item.key)}>
                                    <View style={styles.button}>
                                        <View style={styles.buttonText}>
                                            자세히 보기
                                        </View>
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
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    posterImage: {
      width: '100%',
      height: ITEM_SIZE * 1,
      resizeMode: 'cover',
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
    },
    badgePill: {
     fontSize: 10, 
     letterSpacing: -0.6, 
     color: colors.gray2, 
     opacity: .5
 },
   button: {
     width: 120,
     height: 30,
     marginTop: 15,
     borderRadius: 24,
     backgroundColor: colors.main4,
     justifyContent: 'center'
   },
   buttonText: {
     fontSize: 14,
     color: colors.white,
     textAlign: 'center',
     fontWeight: 'bold'
 
   }
});
  