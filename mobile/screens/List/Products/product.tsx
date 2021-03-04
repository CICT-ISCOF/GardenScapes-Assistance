import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderImage from '../../../shared/header-image';
import { } from 'react-native-gesture-handler';
import styles from './product.style'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';



export default function ProductList() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View>
            <HeaderImage title="My Products" color="orange" back={true} />
            <View style={
                { height: 10 }
            } />
            <SwipeListView
                showsVerticalScrollIndicator={false}
                data={Array(20).fill("")
                    .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))}
                renderItem={() => (
                    <View style={[styles.card, { backgroundColor: Colors[colorScheme].background }]}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('ShowProduct')
                        }}>
                            <Image style={styles.image} source={require('../../../assets/placeholders/orange.jpg')} />
                        </TouchableOpacity>
                        <View style={styles.nameContainer}>
                            <Text style={[styles.name, { color: Colors[colorScheme].text }]}>Brikin</Text>
                            <Text style={styles.qtty}>Qtty : 4</Text>
                            <Text style={[styles.price, { marginTop: 10 }]}>₱ 120.00 </Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <TouchableOpacity style={styles.button}>
                                <Text style={styles.buttonText} onPress={() => {
                                    navigation.navigate('EditProducts')
                                }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                renderHiddenItem={() => (
                    <View style={{
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