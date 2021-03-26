import React from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash( { navigation }: any ) {


    React.useEffect( () => {
        ( async () => {
            if ( await AsyncStorage.getItem( 'has-stepper' ) == undefined ) {
                await AsyncStorage.setItem( 'has-stepper', 'true' )
                setTimeout( () => {
                    navigation.replace( 'Step1' )
                }, 1000 );
            } else {
                setTimeout( () => {
                    navigation.replace( 'Root' )
                }, 1000 );
            }
        } )()

    }, [ navigation ] )


    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}
        >
            <Animatable.Image
                animation="zoomIn" easing="ease-out" duration={1000} iterationCount={1} direction="normal"
                style={{
                    resizeMode: 'stretch',
                    position: 'absolute',

                    zIndex: 9,
                    height: 100,
                    width: 100,
                    alignSelf: 'center'
                }}
                source={require( '../../assets/images/flower.png' )}
            />

        </View>
    );
}
