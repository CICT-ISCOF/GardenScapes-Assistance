import React from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import * as Animatable from 'react-native-animatable';

export default function Loader( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <BlurView
            intensity={100}
            style={[ {
                flex: 1,

                alignSelf: 'center',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 99,
                height: '100%',
                width: '100%'
            },
            props.loading == true ? {} : { left: -500 }
            ]}>

            <Animatable.Image
                animation="rotate" iterationCount="infinite" direction="normal"
                style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'stretch',
                    alignSelf: 'center',
                    marginBottom: 20,
                    position: 'absolute',
                    zIndex: 9,
                }} source={require( '../assets/preloader/light-spinner.png' )} />
            <Image
                style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'stretch',
                    alignSelf: 'center',
                    marginBottom: 20,
                    transform: [ { translateY: 17 } ]

                }} source={require( '../assets/preloader/light.png' )} />
            <Text
                style={{
                    color: Colors[ colorScheme ].tint,
                    alignSelf: 'center'
                }}
            >{props.text}</Text>
        </BlurView >
    );
}
