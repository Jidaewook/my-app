import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Transition, Transitioning, TransitioningView} from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';

import { colors, sizes, fonts } from '../../consts';

const screenWidth = Dimensions.get('window').width;

const categories = [
    {
        title: '패스매니저가 무엇인가요?',
        bg: '#00f',
        answer: '패스매니저는 여러분의 수험 생활을 관리해주는 최전선 관리인입니다. 수험생활을 하는 데 있어 필요한 교육과정과 맞춤형 관리를 할 수 있도록 제공되는, 패스미 고유의 학습관리 서비스입니다.'
    },
    {
        title: '패스매니저는 어떻게 구성되어 있나요?',
    bg: '#00f',
    answer: '패스매니저는 NCS/PSAT을 중심으로, 각종 적성검사 문제풀이 역량을 강화시키기 위한 커리큘럼으로 구성되어 있습니다. 크게 기초모듈이론, 기출문제분석, 실전연습으로 구분합니다.'
    },
    {
        title: 'NCS는 무엇인가요?',
    bg: '#00f',
    answer: 'NCS는 공기업 직무적성 검사로, 공기업 시험을 구성하고 있는 시험체계입니다. 구체적으로는 복잡하게 나뉘겠지만, 의사소통/수리능력/문제해결능력을 포함한 총 10개 과목으로 구성되어 있습니다. 자세한 내용은 영상을 확인해주시기 바랍니다.'
    },
    {
        title: 'PSAT는 무엇인가요?',
    bg: '#00f',
    answer: 'PSAT는 공직 직무적성 검사로, 공무원 시험의 1차 시험으로 구성된 적성검사 시험체계입니다. 언어논리, 자료해석, 상황판단으로 구성되어 있습니다.'
    },
    {
        title: '구독했을 때의 혜택은 무엇인가요?',
        vg: '#00f',
        answer: '패스미를 구독하면, 패스미에서 제공되는 모든 서비스를 이용할 수 있습니다. 온라인으로 제공되는 영상과 pdf로 제공되는 모든 파일들의 이용권한, 상담권을 받게 됩니다.'
    }
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
            <View
                style={styles.containerView}
            >
            {categories.map(({title, answer, bg}, index) => {
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
                                <Text style={styles.headerName}>{title}</Text>
                                <FontAwesome
                                    size={14}
                                    color={colors.gray1}
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
                                        <Text style={styles.answerText}>
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
            </View>

        </Transitioning.View>
    );
};

export default Frequency;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: sizes.sideLine,
        backgroundColor: colors.white
      },
      containerView: {
        marginHorizontal: sizes.sideLine
      },    
      cardContainer: {
        // flexGrow: 1,
      },
      card: {
        flexGrow: 1,
        marginVertical: sizes.sideLine,
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      headerName: {
        ...fonts.h4,
        fontWeight: 'bold',
        color: colors.gray1
      },
      subCategory: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: sizes.header,
        
        // delete it later
        // justifyContent: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#f04',
      },
      category: {
        // width: screenWidth / 4,
        // height: screenWidth / 4,
        alignItems: 'center',
        justifyContent: 'center',
        padding: sizes.body / 2,
        alignSelf:"center",

      },
      answerText: {
        ...fonts.h4,
        color: colors.gray1
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