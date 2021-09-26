import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';

import {colors, sizes, fonts} from '../../consts';

const Section = ({title, horizontal=true, children, show=true}) => {
    const navigation = useNavigation();
    
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text size={18} bold color={colors.black} style={styles.title}>
                    {title}
                </Text>
                {/* 상황값 필요 */}
                {title==="주목! NCS" ? 
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Detail")}
                    >
                        <Text size={12} color={colors.gray3} style={styles.more}>
                            {show === true ? ("더보기") : (null)}
                        </Text>
                    </TouchableOpacity> 
                :   <TouchableOpacity
                        onPress={() => navigation.navigate("Notification")}
                    >
                        <Text size={12} color={colors.gray3} style={styles.more}>
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
        marginVertical: 5,

    },
    title: {
        paddingLeft: 10,
        marginBottom: 0,
        width: '80%',
        color: colors.black
    },
    more: {
        paddingLeft: 15,
        marginBottom: 0,
        justifyContent: 'space-between'
    }
})