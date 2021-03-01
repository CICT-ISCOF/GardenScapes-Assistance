import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function Margin() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View style={{
            height: 50,
            width: '100%',
            backgroundColor: Colors[colorScheme].background
        }}>

        </View>
    );
}
