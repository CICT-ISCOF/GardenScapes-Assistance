import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Platform, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from './product.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function SunAndWaterProducts(props: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [sunRating, setSunRating] = useState(0)
    const [waterRating, setwaterRating] = useState(0)


    const sunTexts = [
        'No Sun',
        'Light Sun',
        'Medium Sun',
        'High Sun',
        'Always on Sun',
    ]


    const waterTexts = [
        'No Water',
        'Light Water',
        'Medium Water',
        'High Water',
        'Always on Water',
    ]



    return (
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
                height: 550,
                alignItems: 'center',
            }}>

                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text }}>Sun & Water Needed</Text>

                <Text
                    style={{
                        color: 'orange',
                        marginTop: 20,
                        marginBottom: 10,
                        fontSize: 20
                    }}>
                    {sunTexts[sunRating]}
                </Text>
                <Rating
                    type='custom'
                    ratingImage={colorScheme == 'dark' ? require('../../../assets/sun_and_water/sunDark.png') : require('../../../assets/sun_and_water/sunLight.png')}
                    ratingColor='orange'
                    ratingBackgroundColor='gray'
                    ratingCount={4}
                    imageSize={40}
                    startingValue={0}
                    onFinishRating={(rating) => {
                        setSunRating(rating)
                    }}
                />


                <Text
                    style={{
                        color: '#41A1D6',
                        marginTop: 20,
                        marginBottom: 10,
                        fontSize: 20
                    }}>
                    {waterTexts[waterRating]}
                </Text>
                <Rating
                    type='custom'
                    ratingImage={colorScheme == 'dark' ? require('../../../assets/sun_and_water/waterDark.png') : require('../../../assets/sun_and_water/waterLight.png')}
                    ratingColor='#41A1D6'
                    ratingBackgroundColor='gray'
                    ratingCount={4}
                    imageSize={30}
                    startingValue={0}
                    onFinishRating={(rating) => {
                        setwaterRating(rating)
                    }}
                />


                <TouchableOpacity style={styles.button} onPress={() => {
                    props.data({
                        sun: sunRating,
                        water: waterRating
                    })
                    props.blur(true)
                }}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}
