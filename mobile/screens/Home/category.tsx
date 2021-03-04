import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function Categories(props: any) {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>

            <TouchableOpacity onPress={() => {
                props.header('flat-green')
            }} style={[styles.button, { backgroundColor: props.color == 'orange' ? '#FEB400' : '#02AF50' }]}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Plantitas/Plantitos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.header('orange')
            }} style={[styles.button, { backgroundColor: props.color == 'orange' ? '#FEB400' : '#02AF50' }]}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Fruit Vegies</Text>
            </TouchableOpacity>


        </ScrollView>
    );
}
