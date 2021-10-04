import axios from 'axios';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import { View, Text } from 'react-native';
import {useNavigation} from '@react-navigation/native';

axios.defaults.baseURL = "http://localhost:8081"

const Detail2 = ({route}) => {

    const navigation = useNavigation();

    const {id, isNot, title} = route.params;

    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(true);

    const getDetail = async (detailId) => {
        try {
            const {data} = isNot 
            ? await axios.get(`/notice/${detailId}`)
            : await axios.get(`/bbs/${detailId}`)
            setDetail(data.results)
        } catch (err) {
            console.log(err)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title
        })
    })

    useEffect(() => {
        getDetail(id)
    })

    return (
        <View>
            <Text>
                {detail.title}
            </Text>
            
        </View>
    );
};

export default Detail2;