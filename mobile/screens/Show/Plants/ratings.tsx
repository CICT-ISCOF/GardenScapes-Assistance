import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import styles from '../show.style'


export default function Ratings( props: any ) {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();
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
        <View style={{
            flex: 4
        }}>
            <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Sun & Water Needed</Text>
            <View
                style={{
                    alignSelf: 'flex-start',
                }}>
                <Text style={{
                    marginTop: 7,
                    textAlign: 'center',
                    color: 'orange'
                }}> {sunTexts[ props.sun ] || 0}</Text>
                <Rating
                    type='custom'
                    ratingImage={colorScheme == 'dark' ? require( '../../../assets/sun_and_water/sunDark.png' ) : require( '../../../assets/sun_and_water/sunLight.png' )}
                    ratingColor='orange'
                    ratingBackgroundColor={Colors[ colorScheme ].bg}
                    ratingCount={4}
                    startingValue={props.sun || 0}
                    imageSize={30}
                    readonly={true}
                />

            </View>

            <View
                style={{
                    alignSelf: 'flex-start',
                }}>
                <Text style={{
                    marginTop: 7,
                    textAlign: 'center',
                    color: '#41A1D6'
                }}> {waterTexts[ props.water ] || 0}</Text>
                <Rating
                    type='custom'
                    ratingImage={colorScheme == 'dark' ? require( '../../../assets/sun_and_water/waterDark.png' ) : require( '../../../assets/sun_and_water/waterLight.png' )}
                    ratingColor='#41A1D6'
                    ratingBackgroundColor={Colors[ colorScheme ].bg}
                    ratingCount={4}
                    startingValue={props.water || 0}
                    imageSize={30}
                    readonly={true}

                />

            </View>
        </View>
    );
}
