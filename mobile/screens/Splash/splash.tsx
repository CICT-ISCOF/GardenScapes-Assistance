import React from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash() {

    const navigation = useNavigation();

    React.useEffect( () => {
        ( async () => {
            if ( await AsyncStorage.getItem( 'has-stepper' ) == undefined ) {
                await AsyncStorage.setItem( 'has-stepper', 'true' )
                setTimeout( () => {
                    navigation.navigate( 'Step1' )
                }, 100 );
            } else {
                navigation.navigate( 'SignUp' )
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
                animation="fadeInDown" easing="ease-out" duration={1000} iterationCount={0} direction="normal"
                style={{
                    resizeMode: 'stretch',
                    position: 'absolute',
                    top: '35%',
                    zIndex: 9
                }}
                source={require( '../../assets/images/splashlogo.png' )}
            />
            <Image
                style={{
                    width: '100%',
                    position: 'absolute',
                    top: '0%',
                    flex: 1
                }}
                source={require( '../../assets/bg.png' )}
            />
        </View>
    );
}
