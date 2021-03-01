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
            }} style={[styles.button, { backgroundColor: Colors[colorScheme].bg }]}>
                <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>Plantitas/Plantitos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                props.header('orange')
            }} style={[styles.button, { backgroundColor: Colors[colorScheme].bg }]}>
                <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>Fruit Vegies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme].bg }]}>
                <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>Beans</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme].bg }]}>
                <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>Leafy Vegies</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme].bg }]}>
                <Text style={[styles.buttonText, { color: Colors[colorScheme].text }]}>Root Vegies</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}
