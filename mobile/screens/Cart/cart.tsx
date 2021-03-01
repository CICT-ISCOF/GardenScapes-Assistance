import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderImage from '../../shared/header-image';
import { } from 'react-native-gesture-handler';
import styles from './cart.style'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';


export default function Cart() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View style={{ backgroundColor: Colors[colorScheme].bg }}>
            <HeaderImage title="My Cart" color="pink" back={true} />
            <SwipeListView
                showsVerticalScrollIndicator={false}
                data={Array(20).fill("")
                    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))}
                renderItem={() => (
                    <View style={[styles.card, { backgroundColor: Colors[colorScheme].bg }]}>
                        <TouchableOpacity>
                            <Image style={styles.image} source={require('../../assets/placeholders/green.png')} />
                        </TouchableOpacity>
                        <View style={styles.nameContainer}>
                            <Text style={[styles.name, { color: Colors[colorScheme].text }]}>Brikin</Text>
                            <Text style={styles.qtty}>Qtty</Text>
                            <View style={styles.qttyContainer}>
                                <TouchableOpacity style={styles.qttyButton}>
                                    <Text style={[styles.qttyButtonText, { color: Colors[colorScheme].text }]}>-</Text>
                                </TouchableOpacity>
                                <Text style={[styles.qttyButtonText1, { color: Colors[colorScheme].text }]}>2</Text>
                                <TouchableOpacity style={styles.qttyButton}>
                                    <Text style={[styles.qttyButtonText, { color: Colors[colorScheme].text }]}>+</Text>
                                </TouchableOpacity>
                            </View >
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>₱ 120.00 </Text>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                renderHiddenItem={() => (
                    <View style={{
                        backgroundColor: Colors[colorScheme].bg,
                        position: 'absolute',
                        right: 0,
                        width: 75,
                        alignSelf: 'center',
                    }}>
                        <TouchableOpacity onPress={() => {
                            alert('na tumok ya delete')
                        }} style={{
                            transform: [{ translateY: 40 }]
                        }}>
                            <Ionicons style={{ textAlign: 'center', }} name="trash" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-75}
                closeOnRowPress={true}
                closeOnScroll={true}
                disableRightSwipe={true}
                useAnimatedList={true}
                useNativeDriver={true}

            />



        </View>
    );
}

