import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function Step3() {
    const navigation = useNavigation();
    return (
        <View style={{
            flex: 1,
        }}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate( 'Step4' )
                }}
                style={{
                    flex: 1, position: 'relative',
                    zIndex: 99,
                }}
            >
                <Image
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: '0%',
                        flex: 1
                    }}
                    source={require( '../../assets/step/3.png' )}
                />

            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate( 'Step4' )
                }}
                style={styles.stepTab}>
                <View style={styles.stepper}></View>
                <View style={styles.stepper}></View>
                <View style={styles.stepperActive}></View>
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