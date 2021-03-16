import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function Step1() {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
        }}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate( 'Step2' )
                }}
                style={{
                    flex: 1, position: 'relative',
                    zIndex: 99,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        zIndex: 9,
                        alignSelf: 'center', position: 'absolute',
                        top: '25%',
                        fontSize: 22,
                        textAlign: 'center'
                    }}>
                    Welcome to
                </Text>
                <Text
                    style={{
                        color: 'white',
                        zIndex: 9,
                        alignSelf: 'center', position: 'absolute',
                        top: '60%',
                        fontSize: 35,
                        fontWeight: '900',
                        textAlign: 'center'
                    }}>
                    GARDENSCAPES ASSISTANCE
                </Text>
                <Image
                    style={{
                        resizeMode: 'contain',
                        position: 'absolute',
                        top: '25%',
                        zIndex: 9,
                        alignSelf: 'center',
                        margin: 50,
                        height: 200

                    }}
                    source={require( '../../assets/logo.png' )}
                />
                <Image
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: '0%',
                        flex: 1,
                    }}
                    source={require( '../../assets/bg.png' )}
                />

            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate( 'Step2' )
                }}
                style={styles.stepTab}>
                <View style={styles.stepperActive}></View>
                <View style={styles.stepper}></View>
                <View style={styles.stepper}></View>
                <View style={styles.stepper}></View>
                <View style={styles.stepper}></View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create( {
    stepTab: {
        width: '100%',
        backgroundColor: '#15AC5A',
        height: 90,
        zIndex: 100,
        position: 'absolute',
        bottom: '0%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    stepper: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: 'white',
        margin: 5,
        opacity: .5

    },
    stepperActive: {
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: 'white',
        margin: 5,
    }
} )