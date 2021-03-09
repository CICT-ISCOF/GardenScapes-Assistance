import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function HeaderImage( props: any ) {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    let header = {
        height: Platform.OS === 'ios' ? 95 : 105
    }

    let image = require( `../assets/headers/green.png` )



    if ( props.color == 'blue' ) {
        image = require( `../assets/headers/blue.png` )
    }

    if ( props.color == 'pink' ) {
        image = require( `../assets/headers/pink.png` )
    }

    if ( props.color == 'orange' ) {
        image = require( `../assets/headers/flat-orange.png` )
    }

    if ( props.color == 'flat-green' ) {
        image = require( `../assets/headers/flat-green.png` )
    }

    if ( props.color == 'red' ) {
        image = require( `../assets/headers/red.png` )
    }

    if ( props.color == 'black' ) {
        image = require( `../assets/headers/black.png` )
    }


    if ( props.color == 'yellow' ) {
        image = require( `../assets/headers/yellow.png` )
    }






    return (
        <View style={ Platform.OS === 'ios' ? {} : { marginTop: -10 } }>
            <Image style={ [ {
                position: 'absolute',
                height: 250,
                resizeMode: 'stretch'
            }, header ] } source={ image } />
            <View style={ {
                position: 'absolute',
                right: 20,
                top: 50,
                flexDirection: 'row',
                zIndex: 9
            } } >
                <TouchableOpacity style={ props.color == 'yellow' ? { position: 'absolute', top: -500 } : {} }
                    onPress={ () => {
                        navigation.navigate( 'HelpfulTips' )
                    } }>
                    <Ionicons name="ios-help-circle-outline" size={ 29 } color="white" />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={ () => {
                        navigation.navigate( 'Profile' )
                    } } >

                    <MaterialCommunityIcons name="account" style={ { marginLeft: 10 } } size={ 29 } color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => {
                    navigation.goBack()
                } } style={ [
                    props.back == false ? { position: 'absolute', right: -500, } : {}
                ] }>
                    <AntDesign name="close" style={ { marginLeft: 10 } } size={ 29 } color="white" />
                </TouchableOpacity>

            </View>
            <View>
                <Text style={ styles.title }>{ props.title }</Text>
                <Text style={ styles.title1 }>{ props.title1 }</Text>
            </View>

        </View>
    );
}
const styles = StyleSheet.create( {
    title: {
        marginTop: 50,
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'

    },
    title1: {
        paddingLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white'

    },
} )