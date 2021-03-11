import React from 'react';
import { View, Text, Image } from 'react-native';
import HeaderImage from '../../shared/header-image';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import styles from './menu.style'
import Menus from './menus';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default function Menu() {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].bg,
            flex: 1
        }}>
            <HeaderImage title="Menu" color="blue" back={false} />
            <Menus />
        </View>
    );
}
