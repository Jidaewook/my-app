import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

import {colors, sizes, fonts} from '../../consts';

const Section = ({title, horizontal=true, children, show=true}) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <View style={styles.viewBox}>
                <Text style={styles.title}>
                    {title}
                </Text>
                {/* 상황값 필요 */}
                {title==="주목! NCS" ? 
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <Text style={styles.more}>
                            {show === true ? ("더보기") : (null)}
                        </Text>
                    </TouchableOpacity> 
                :   <TouchableOpacity
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <Text style={styles.more}>
                            {show === true ? ("더보기") : (null)}
                        </Text>
                    </TouchableOpacity>
                } 
            </View>
            
            <ScrollView
                horizontal={horizontal}
                showsHorizontalScrollIndicator={false}
            >
                {children}
            </ScrollView>
        
        </View>
    );
};

Section.propTypes = {
    title: PropTypes.string.isRequired,
    horizontal: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Section;

const styles = StyleSheet.create({
    container: {

    },
    viewBox: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    title: {
        paddingLeft: sizes.sideLine,
        width: '90%',
        color: colors.black,
        ...fonts.title,
        marginLeft: -20
    },
    more: {
        paddingLeft: sizes.sideLine,
        justifyContent: 'space-between',
        ...fonts.h6,
        color: colors.gray2

    }
})