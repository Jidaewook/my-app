import React, {useState, useLayoutEffect} from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import Moment from 'react-moment';
import axios from 'axios';


const {width, height} = Dimensions.get('window'); 

const moreNcs = () => {


    const route = useRoute()
    const {title} = route.params

    console.log(title)

    const navigation = useNavigation();
    const categories = ['전체강의', '수리능력', '학습지', '모듈과목', '썰방'];
    const [active, setActive] = useState('전체강의');
    const [loading, setLoading] = useState(true);
    const [ncs, setNcs] = useState([]);

    const nowTime = Date.now();

    const [filteredData, setFilteredData] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    })

    return (


        <View>
            <Text>
                moreNcs
            </Text>
            
        </View>
    );
};

export default moreNcs;