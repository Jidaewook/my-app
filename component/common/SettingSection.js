import React from 'react';
import styled from 'styled-components';
import {View, Text} from 'react-native';

import {colors, fonts, sizes} from '../../consts'

const ProfileContainer = styled.View`
    flex: 1;
    height: 35px;
    justify-content: center;
`;

const FirstLine = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ProfileTitle = styled.Text`
    font-size: 15px;
    color: ${colors.gray};
    font-weight: 800;
    margin-left: 15px;
`;

const Container = styled.View`
    background-color: ${colors.gray5};
    flex-direction: row;
    align-items: center;
    padding: 5px;
    ${Platform.select({
        ios: {
            fontFamily: "Avenir",
        },
        android: {
            fontFamily: "Roboto",
        },
    })};
`;

const SingleContainer = styled.View`
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
`;

const SettingSection = ({title}) => {
    return (
            <Container>
                <SingleContainer>
                    <ProfileContainer>
                        <ProfileTitle>
                            {title}
                        </ProfileTitle>
                    </ProfileContainer>
                    
                    

                </SingleContainer>
            </Container>

    );
};

export default SettingSection;