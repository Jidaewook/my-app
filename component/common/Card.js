import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Block, Text } from 'galio-framework';
import {colors, sizes, fonts} from '../../consts';

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

        return (
            <Block row={horizontal} card flex style={cardContainer}>
                <TouchableOpacity onPress={goTo}>
                    <Block flex style={imgContainer}>
                        <Image source={{uri: item.poster}} style={imageStyles} />
                    </Block>
                    <Block flex space="between" style={styles.cardDescription}>
                        <Text size={16} style={styles.cardTitle}>{item.title}</Text>
                        <Text size={12} muted={!ctaColor} color={ctaColor} bold>{item.cta}</Text>
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
});
  
export default withNavigation(Card);
  