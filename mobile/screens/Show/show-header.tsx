import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './show.style'

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function ShowHeader(props: any) {


    const colorScheme = useColorScheme();
    const navigation = useNavigation();


    return (
        <View style={{
            zIndex: 9,
            flexDirection: 'row',
            position: 'relative',
            transform: [{ translateY: 50 }],
            padding: 10
        }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={
                    [styles.topButtons]
                }>
                <Ionicons name="arrow-back-outline" size={20} color="white" />
            </TouchableOpacity>

            <View style={
                { flex: 3 }
            } />

            <TouchableOpacity style={
                [styles.topButtons, { alignSelf: 'flex-end' }]
            }
                onPress={() => {
                    navigation.navigate('Cart')
                }} >

                <AntDesign name="shoppingcart" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Profile')
                }} style={

                    [styles.topButtons]
                }>
                <MaterialCommunityIcons name="account" size={20} color="white" />
            </TouchableOpacity>

        </View>
    );
}

