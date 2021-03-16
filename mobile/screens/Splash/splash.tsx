import React from 'react';
import { View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Splash() {

    const navigation = useNavigation();

    React.useEffect( () => {
        setTimeout( () => {
            navigation.navigate( 'Step1' )
        }, 1000 );
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
