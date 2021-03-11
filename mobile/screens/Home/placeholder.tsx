import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

export default function PlaceHolder() {
    const colorScheme = useColorScheme();
    return (
        <View
            style={[ styles.productContainer, { backgroundColor: Colors[ colorScheme ].background, width: ( Dimensions.get( 'window' ).width / 2 ) - 20, margin: 10 } ]}  >
            <Image style={[ styles.productImage, { height: 150 } ]} source={require( '../../assets/placeholders/image.png' )} />
            <View style={{
                marginLeft: 10
            }}>
                <View style={{
                    height: 7,
                    backgroundColor: 'rgba(150,150,150,.2)',
                    width: '80%',
                    marginBottom: 7
                }} />
                <View style={{
                    height: 7,
                    backgroundColor: 'rgba(150,150,150,.2)',
                    width: '60%',
                    marginBottom: 7
                }} />
                <View style={{
                    height: 7,
                    backgroundColor: 'rgba(150,150,150,.2)',
                    width: '40%',
                    marginBottom: 27
                }} />
            </View>
        </View>
    );
}
