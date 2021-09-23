import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import { HomeStack, PostStack, ProfileStack, WorkbookStack } from '.';
import { colors } from '../consts';


const Tabbar = createBottomTabNavigator();

const Tabs = () => {

    return (
        <Tabbar.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused}) => {
                    let iconName
                    if (route.name === "Main") {
                        iconName = "home";
                    } else if (route.name === "Workbook") {
                        iconName = "compass";
                    } else if (route.name === "Post") {
                        iconName = "server";
                    } else if (route.name === "Profile") {
                        iconName = "user"
                    }
                    return (
                        <Feather 
                            name={iconName}
                            color={focused ? colors.main4 : colors.gray2}
                            size={22}
                        />
                    )
                },
                tabBarActiveTintColor: colors.main4,
                tabBarInactiveTintColor: colors.gray2,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: -5
                },
                headerShown: false
            })}            
        >
            <Tabbar.Screen 
                name={"Main"}
                component={HomeStack}
            />
            <Tabbar.Screen 
                name={"Workbook"}
                component={WorkbookStack}
            />
            <Tabbar.Screen 
                name={"Post"}
                component={PostStack}
            />
            <Tabbar.Screen 
                name={"Profile"}
                component={ProfileStack}
            />
        </Tabbar.Navigator>
    );
};

export default Tabs;