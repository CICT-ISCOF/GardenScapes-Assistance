import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Margin from '../../shared/margin';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from 'react-native-animated-bottom-sheet';


export default function ShowDisease({ route }: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();


    const [files, setfiles] = useState([1, 3, 4, 4, 5, 6, 7])

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
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text, alignSelf: 'flex-start', flex: 3 }}>Fullscreen Image</Text>
                </View>
                <Image style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height - 150,
                    marginTop: 20
                }} source={require('../../assets/placeholders/green.png')} />
            </View>
        </View>
    );



    return (
        <View style={{
            backgroundColor: Colors[colorScheme].background, flex: 1
        }}>
            <Margin />
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={{
                    margin: 10
                }}>
                <Ionicons name="arrow-back" size={24} color={Colors[colorScheme].text} />
            </TouchableOpacity>
            <ScrollView style={{
                backgroundColor: Colors[colorScheme].background, flex: 1
            }} showsVerticalScrollIndicator={false}>
                <ScrollView style={[styles.imageScrollView, files.length == 0 ? { position: 'absolute', left: -500 } : {}]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        files.map((image: any, index: any) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        ImageViewerRef.current.open()
                                    }}
                                >
                                    <Image key={index} style={styles.productImage} source={require('../../assets/placeholders/green.png')} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                <View style={{
                    padding: 30
                }}>
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text, }}>Disease Title</Text>

                    <Text style={{
                        color: 'gray',
                        marginTop: 20,
                        lineHeight: 30
                    }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, iusto! Sequi velit ullam quas eum, modi porro est maiores quo perspiciatis tenetur! Inventore ut fugiat sit aperiam, asperiores animi dignissimos.
             </Text>
                </View>
            </ScrollView>
            <BottomSheet
                ref={ImageViewerRef}
                renderContent={ImageViewerSheet}
                visibleHeight={Dimensions.get('window').height - 50}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageScrollView: {
        height: 200,
        width: '100%',
        backgroundColor: 'lightgray'
    },
    productImage: {
        height: '100%',
        width: 280,
        resizeMode: 'stretch'
    },
})