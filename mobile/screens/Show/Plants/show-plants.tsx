import React, { useRef, useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ShowHeader from '../show-header';
import Ratings from './ratings';
import styles from '../show.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from 'react-native-animated-bottom-sheet';


export default function ShowPlant() {


    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const varieties = [1, 2, 3, 4, 5, 6]

    const GuidesRef: any = useRef();
    const GuideSheet = () => (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                transform: [{ translateY: -10 }]
            }} />
            <View style={{
                backgroundColor: Colors[colorScheme].background,
                padding: 20,
                height: 950,
                alignItems: 'center',
            }}>
            </View>
        </View>
    );

    const ImageViewerRef: any = useRef();
    const ImageViewerSheet = () => (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: Colors[colorScheme].bg,
                alignSelf: 'center',
                transform: [{ translateY: -10 }]
            }} />
            <View style={{
                backgroundColor: Colors[colorScheme].bg,
                padding: 20,
                height: 850,
                alignItems: 'center',
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text, alignSelf: 'flex-start', flex: 3 }}>Variety Name</Text>
                </View>
                <Image style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height - 150,
                    marginTop: 20
                }} source={require('../../../assets/placeholders/green.png')} />
            </View>
        </View>
    );


    return (
        <View>
            <ScrollView style={{
                backgroundColor: Colors[colorScheme].bg
            }}>
                <ShowHeader />

                <ScrollView horizontal={true}
                    style={{
                        marginTop: -60,
                        backgroundColor: 'gray'
                    }}
                    showsHorizontalScrollIndicator={false}>
                    <Image style={styles.images} source={require('../../../assets/placeholders/green.png')} />
                </ScrollView>

                <View style={[styles.card, { backgroundColor: Colors[colorScheme].background }]}>
                    <Text style={styles.price}>₱ 120.00</Text>
                    <Text style={[styles.name, { color: Colors[colorScheme].text }]}>Montstera</Text>
                </View>

                <View style={[styles.card, { backgroundColor: Colors[colorScheme].background, flexDirection: 'row' }]}>
                    <Ratings />
                    <TouchableOpacity
                        onPress={() => {
                            GuidesRef.current.open()
                        }}
                        style={styles.guide}>
                        <Feather name="help-circle" size={24} color="#22A6F2" />
                        <Text style={{
                            fontSize: 10,
                            marginTop: 7,
                            color: Colors[colorScheme].text
                        }}>Guide</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, { backgroundColor: Colors[colorScheme].background }]}>
                    <Text style={[styles.title, { color: Colors[colorScheme].text }]}>Introduction</Text>
                    <Text style={{
                        color: 'gray'
                    }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt repellendus voluptatem suscipit dolorem perspiciatis, neque, officiis doloribus in nihil esse odio sit praesentium minus iure, impedit maiores commodi culpa nostrum.</Text>
                </View>
                <View style={{ backgroundColor: Colors[colorScheme].background }} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            varieties.map((variety: any, index: any) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        ImageViewerRef.current.open()
                                    }}>
                                        <Image style={styles.cardImage} source={require('../../../assets/placeholders/green.png')} />
                                        <Text style={{
                                            textAlign: 'center',
                                            color: Colors[colorScheme].text
                                        }}>Variety Name</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ height: 80 }} />

            </ScrollView >
            <View style={[styles.footer, styles.card, { backgroundColor: Colors[colorScheme].background, paddingTop: -0 }]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Chatbox', { chatBot: false })
                    }} style={{

                        marginLeft: 10,
                        borderRightWidth: 1,
                        paddingRight: 20,
                        borderRightColor: 'rgba(150,150,150,.2)',
                    }}>
                    <Ionicons name="chatbubble-outline" size={24} color={Colors[colorScheme].text} />
                    <Text>Chat</Text>
                </TouchableOpacity>

                <View style={{ flex: 3 }}></View>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Chatbox', { chatBot: true })
                    }}
                    style={[styles.button, {
                        backgroundColor: '#FFC000'
                    }]}>
                    <Text style={{
                        fontWeight: '500'
                    }}>Buy Now</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        alert('Successfully added to cart')
                    }} style={[styles.button, {

                        backgroundColor: '#E61487'
                    }]}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>


            <BottomSheet
                ref={GuidesRef}
                renderContent={GuideSheet}
                visibleHeight={Dimensions.get('window').height / 1.25}
            />

            <BottomSheet
                ref={ImageViewerRef}
                renderContent={ImageViewerSheet}
                visibleHeight={Dimensions.get('window').height - 50}
            />
        </View>
    );
}
