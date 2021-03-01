import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ShowHeader from '../show-header';
import Ratings from '../Plants/ratings';
import styles from '../show.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function ShowProduct() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const comapanions = [1, 2, 3, 4, 5, 6]

    return (
        <View>
            <ScrollView style={{
                backgroundColor: Colors[colorScheme].background
            }}>
                <ShowHeader />

                <ScrollView horizontal={true}
                    style={{
                        marginTop: -60,
                        backgroundColor: 'gray'
                    }}
                    showsHorizontalScrollIndicator={false}>
                    <Image style={styles.images} source={require('../../../assets/placeholders/orange.jpg')} />
                </ScrollView>

                <View style={[styles.card, { backgroundColor: Colors[colorScheme].bg, flexDirection: 'row' }]}>
                    <View style={{
                        flex: 3
                    }}>
                        <Text style={styles.price}>₱ 120.00</Text>
                        <Text style={[styles.name, { color: Colors[colorScheme].text }]}>Sweet Potato</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>


                        <TouchableOpacity style={styles.guide}>
                            <Feather name="layout" size={24} color="gray" />
                            <Text style={{
                                fontSize: 10,
                                marginTop: 7,
                                color: Colors[colorScheme].text
                            }}>LayoutIdeas</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.guide, { marginLeft: 20 }]}>
                            <Feather name="help-circle" size={24} color="#22A6F2" />
                            <Text style={{
                                fontSize: 10,
                                marginTop: 7,
                                color: Colors[colorScheme].text
                            }}>Guide</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.card, { backgroundColor: Colors[colorScheme].bg, flexDirection: 'row' }]}>
                    <View>
                        <Ratings />
                        <Text style={{ marginTop: 7, color: Colors[colorScheme].text }}>Soil pH:  <Text style={{ color: '#9DC16B' }}>5.8</Text></Text>
                        <Text style={{ marginTop: 7, color: Colors[colorScheme].text }}>Soil Type:  <Text style={{ color: '#9DC16B' }}>Loamy Soil</Text></Text>
                    </View>
                    <View style={{
                        padding: 20
                    }}>
                        <Text style={{ marginTop: 7, color: Colors[colorScheme].text }} >Soil Depth: <Text style={{ color: '#9DC16B' }}> 6 inches</Text></Text>
                        <Text style={{ marginTop: 7, color: Colors[colorScheme].text }}>Row Distance: <Text style={{ color: '#9DC16B' }}> 36 inches</Text></Text>
                        <Text style={{ marginTop: 7, color: Colors[colorScheme].text }}>Plant Distance: <Text style={{ color: '#9DC16B' }}> 12-18 inches</Text></Text>
                    </View>
                </View>


                <View style={[styles.card, { backgroundColor: Colors[colorScheme].bg }]}>
                    <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Description</Text>
                    <Text style={{
                        color: 'gray'
                    }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt repellendus voluptatem suscipit dolorem perspiciatis, neque, officiis doloribus in nihil esse odio sit praesentium minus iure, impedit maiores commodi culpa nostrum.</Text>
                </View>

                <View style={[styles.card, { backgroundColor: Colors[colorScheme].bg }]}>
                    <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Growth Calendar</Text>
                    <Text style={{ marginTop: 7, color: Colors[colorScheme].text }}>Planting: <Text style={{ color: '#9DC16B' }}>April, May June</Text></Text>
                    <Text style={{ marginTop: 7, color: Colors[colorScheme].text }}>Harvesting: <Text style={{ color: '#9DC16B' }}>April, May June</Text></Text>
                </View>


                <View style={{ backgroundColor: Colors[colorScheme].bg }} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            comapanions.map((variety: any, index: any) => {
                                return (
                                    <View>
                                        <Image style={styles.cardImage} source={require('../../../assets/placeholders/orange.jpg')} />
                                        <Text style={{
                                            textAlign: 'center',
                                            color: Colors[colorScheme].text
                                        }}>Companion Name</Text>
                                        <Text style={{
                                            textAlign: 'center',
                                            color: 'red'
                                        }}>Bad</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ height: 80 }} />
            </ScrollView>
            <View style={[styles.footer, styles.card, { backgroundColor: Colors[colorScheme].bg, paddingTop: -0 }]}>
                <TouchableOpacity style={{
                    marginLeft: 10,
                    borderRightWidth: 1,
                    paddingRight: 20,
                    borderRightColor: 'rgba(150,150,150,.2)',
                }}>
                    <Ionicons name="chatbubble-outline" size={24} color={Colors[colorScheme].text} />
                    <Text>Chat</Text>
                </TouchableOpacity>
                <View style={{ flex: 3 }}></View>
                <TouchableOpacity style={[styles.button, {
                    backgroundColor: '#FFC000'
                }]}>
                    <Text style={{
                        fontWeight: '500'
                    }}>Buy Now</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {
                    backgroundColor: '#E61487'
                }]}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
