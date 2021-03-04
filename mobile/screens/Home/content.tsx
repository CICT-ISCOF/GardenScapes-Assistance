import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
export default function Content(props: any) {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
            paddingLeft: 20,
            height: '65%',
            width: '100%',
            paddingBottom: 20,
            marginTop: 20
        }}>
            <View style={[styles.productContainer, { backgroundColor: props.color == 'orange' ? 'rgba(237,125,49,.2)' : 'rgba(8,173,79,.2)' }]}>
                <Text style={[styles.plantName, { color: Colors[colorScheme].text }]}>Monstera</Text>
                <Text style={[styles.quantity, { color: Colors[colorScheme].text }]}>12pcs available</Text>
                <TouchableOpacity style={styles.productImage} onPress={() => {
                    if (props.category == 1) {
                        navigation.navigate('ShowPlant')
                        return
                    }
                    navigation.navigate('ShowProduct')
                }}>
                    <Image style={styles.productImage} source={props.color != 'orange' ? require('../../assets/placeholders/green.png') : require('../../assets/placeholders/orange.jpg')} />
                </TouchableOpacity>
                <Text style={styles.price}>₱ 120.00 </Text>
                <TouchableOpacity onPress={() => {
                    alert('Successfully added to cart')
                    navigation.navigate('Cart')
                }} style={styles.addToCartButton}>
                    <Feather name="shopping-cart" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={[styles.productContainer, { backgroundColor: props.color == 'orange' ? 'rgba(237,125,49,.2)' : 'rgba(8,173,79,.2)' }]}>
                <Text style={[styles.plantName, { color: Colors[colorScheme].text }]}>Monstera</Text>
                <Text style={[styles.quantity, { color: Colors[colorScheme].text }]}>12pcs available</Text>
                <TouchableOpacity style={styles.productImage} onPress={() => {
                    if (props.category == 1) {
                        navigation.navigate('ShowPlant')
                        return
                    }
                    navigation.navigate('ShowProduct')
                }}>
                    <Image style={styles.productImage} source={props.color != 'orange' ? require('../../assets/placeholders/green.png') : require('../../assets/placeholders/orange.jpg')} />
                </TouchableOpacity>
                <Text style={styles.price}>₱ 120.00 </Text>
                <TouchableOpacity onPress={() => {
                    alert('Successfully added to cart')
                    navigation.navigate('Cart')
                }} style={styles.addToCartButton}>
                    <Feather name="shopping-cart" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

