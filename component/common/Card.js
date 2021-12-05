import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { Block, Text } from 'galio-framework';
import {colors, sizes, fonts} from '../../consts';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';


class Card extends React.Component {
    render() {
        const { navigation, item, horizontal, full, style, ctaColor, imageStyle, goTo } = this.props;

        const imageStyles = [
            full ? styles.fullImage : styles.horizontalImage,
            imageStyle
        ];
        const cardContainer = [styles.card, styles.shadow, style];
        const imgContainer = [
            styles.imageContainer,
            horizontal ? styles.horizontalStyles : styles.verticalStyles,
            styles.shadow
        ];

        // const imgSource = (() => {
        //     switch (item.poster) {
        //         case '' : return {uri: 'https://bit.ly/3bSbSzu'}
        //         default : return {uri: item.poster}
        //     }
        // })()

        
        
        return (
            <Block row={horizontal} card flex style={cardContainer}>
                <TouchableOpacity onPress={goTo}>
                    <Block flex style={imgContainer}>
                        <Image 
                            
                            source={
                                item.poster
                                ? ({uri: item.poster}) 
                                : ({uri: 'https://bit.ly/3bSbSzu'})
                            }
                            style={imageStyles} 
                        />
                    </Block>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Text size={16} style={styles.cardTitle}>{item.title}</Text>
                        <Text size={12} muted={!ctaColor} color={ctaColor} bold>{item.cta}</Text>
                        <View style={styles.footer}>
                            <View style={styles.footer}>
                                <EvilIcons 
                                    name="comment" 
                                    size={24} 
                                    color="black" 
                                    style={{marginRight: 5}}
                                />    
                                <Text>{item.comment.length}</Text>
                            </View>
                            <View style={styles.heart}>
                                <AntDesign 
                                    name={item.like ? "hearto" : "heart"}
                                    size={17} 
                                    color={colors.main4}
                                    style={{marginRight: 5}}    
                                />
                                <Text>{item.like.length}</Text>
                            </View>
                        </View>
                    </Block>
                </TouchableOpacity>
            </Block>
        );
    }
}
  
Card.propTypes = {
    item: PropTypes.object,
    horizontal: PropTypes.bool,
    full: PropTypes.bool,
    ctaColor: PropTypes.string,
    imageStyle: PropTypes.any,
}
  
const styles = StyleSheet.create({
    card: {
    backgroundColor: colors.white,
    marginVertical: sizes.base,
    borderWidth: sizes.zero,
    marginBottom: sizes.headerTop,

    },
    cardTitle: {
        flex: 1,
        flexWrap: 'wrap',
        paddingBottom: sizes.bottom
    },
    cardDescription: {
        padding: sizes.base
    },
    imageContainer: {
        borderRadius: 3,
        elevation: 1,
        overflow: 'hidden',
    },
    horizontalImage: {
        width: 'auto',
    },
    horizontalStyles: {
       
    },
    verticalStyles: {
        
    },
    fullImage: {
        height: sizes.fullImage,
        resizeMode: 'stretch',
        width: '100%'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 2,
    },
    footer: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        marginLeft: sizes.body
    },
    heart: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        marginLeft: sizes.body,
        marginTop: 1
    }
});
  
export default withNavigation(Card);
  