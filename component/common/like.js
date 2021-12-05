import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';

import { colors } from '../../consts';
// import { API_URL } from '../api/baseApi';


const like = () => {


    // const likeAdd = () => {
        
    // }

    // useEffect(() => {

    // }, {})

    return (
        <TouchableOpacity
            onPress={() => setLike(!like)}
            
        >
            <AntDesign 
                name={like ? "heart" : "hearto"}
                size={16}
                color={colors.gray1}
            />
        </TouchableOpacity>
    );
};

export default like;