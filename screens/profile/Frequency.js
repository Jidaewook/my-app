import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Transition, Transitioning, TransitioningView} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

import { colors, sizes } from '../../consts';

const screenWidth = Dimensions.get('window').width;




const categories = [
    {
      category: '패스매니저가 무엇인가요?',
      bg: '#00f',
      answer: '패스매니저는 여러분의 수험 생활을 관리해주는 최전선 관리인입니다. 수험생활을 하는 데 있어 필요한 교육과정과 맞춤형 관리를 할 수 있도록 제공되는, 패스미 고유의 학습관리 서비스입니다.'
    },
    {
    category: '패스매니저가 무엇인가요?',
    bg: '#00f',
    answer: '패스매니저는 여러분의 수험 생활을 관리해주는 최전선 관리인입니다. 수험생활을 하는 데 있어 필요한 교육과정과 맞춤형 관리를 할 수 있도록 제공되는, 패스미 고유의 학습관리 서비스입니다.'
    },
    {
    category: '패스매니저가 무엇인가요?',
    bg: '#00f',
    answer: '패스매니저는 여러분의 수험 생활을 관리해주는 최전선 관리인입니다. 수험생활을 하는 데 있어 필요한 교육과정과 맞춤형 관리를 할 수 있도록 제공되는, 패스미 고유의 학습관리 서비스입니다.'
    },
    {
    category: '패스매니저가 무엇인가요?',
    bg: '#00f',
    answer: '패스매니저는 여러분의 수험 생활을 관리해주는 최전선 관리인입니다. 수험생활을 하는 데 있어 필요한 교육과정과 맞춤형 관리를 할 수 있도록 제공되는, 패스미 고유의 학습관리 서비스입니다.'
    },
  ];

const Frequency = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef();

    const transition = (
        <Transition.Sequence>
            <Transition.Change />
            <Transition.Out type="fade" durationMs={200} />
            <Transition.In type="fade" durationMs={200} /> 
        </Transition.Sequence>
    );

    return (
        <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}
        >
            {categories.map(({category, answer, bg}, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            ref.current.animateNextTransition();
                            setCurrentIndex(index === currentIndex ? null : index);
                        }}
                        activeOpacity={1}
                        delayPressIn={0}
                        style={styles.cardContainer}
                    >
                        
                        <View style={styles.card}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.headerName}>{category}</Text>
                                <FontAwesome
                                size={25}
                                color="#000"
                                name={index === currentIndex ? 'chevron-up' : 'chevron-down'}
                                />
                            </View>
                            {index === currentIndex && (
                                <View style={styles.subCategory}>
                                    <TouchableOpacity
                                        delayPressIn={0}
                                        style={styles.category}
                                        key={answer + Math.random() * 5}
                                    >
                                        <Text>
                                            {answer}
                                        </Text>
                                    </TouchableOpacity>
                                {/* {subCategories.map((subCategory) => (
                                    <TouchableOpacity
                                    delayPressIn={0}
                                    style={styles.category}
                                    key={subCategories + Math.random() * 5}>
                                    <View style={styles.itemContainer}>
                                        <View style={styles.serviceImgContainer}>
                                        <Image
                                            style={styles.serviceImg}
                                            source={{
                                            uri:
                                                'https://cdn1.iconfinder.com/data/icons/appliance-1/100/dryer-03-512.png',
                                            }}
                                        />
                                        </View>
                                        <View style={{width: '80%'}}>
                                        <Text numberOfLines={1}>{subCategory}</Text>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                ))} */}
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                );
            })}

        </Transitioning.View>
    );
};

export default Frequency;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginHorizontal: 20,
        paddingTop: 20,
      },
      cardContainer: {
        // flexGrow: 1,
      },
      card: {
        flexGrow: 1,
        marginVertical: 20,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      headerName: {
        fontSize: 21,
        fontWeight: 'bold',
      },
      subCategory: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal:20, // delete it later
        // justifyContent: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#f04',
      },
      category: {
        // backgroundColor: '#f04',
        width: screenWidth / 4,
        height: screenWidth / 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        alignSelf:"center"
      },
    
      itemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      serviceImgContainer: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#42a5f5',
        borderRadius: 35,
        overflow: 'hidden',
      },
      serviceImg: {
        width: 40,
        height: 40,
      },
});