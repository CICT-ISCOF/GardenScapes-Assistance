import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './show.style'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default function ShowHeader( props: any ) {

    React.useEffect( () => {
        ( async () => {

            await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
                const uid = JSON.parse( user ).uid
                getCart( uid )

            } )
        } )()
    }, [] )

    const [ cartSize, setcartSize ] = React.useState( 0 )
    function getCart( uid: any ) {
        firebase.firestore().collection( 'cart' )
            .where( 'uid', '==', uid )
            .onSnapshot( ( carts: any ) => {
                setcartSize( carts.size )
            } )
    }


    const colorScheme = useColorScheme();
    const navigation = useNavigation();


    return (
        <View style={{
            zIndex: 9,
            flexDirection: 'row',
            position: 'relative',
            transform: [ { translateY: 50 } ],
            padding: 10
        }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={[ styles.topButtons ]}>
                <Ionicons name="arrow-back-outline" size={20} color="white" />
            </TouchableOpacity>

            <View style={{ flex: 3 }} />

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate( 'Cart' )
                }}
                style={[ styles.topButtons, { alignSelf: 'flex-end' } ]}>
                <AntDesign name="shoppingcart" size={20} color="white" />
                <View style={{
                    borderRadius: 50,
                    position: 'absolute',
                    height: 20,
                    width: 20,
                    padding: 0,
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bottom: -5,
                    right: -5
                }}>
                    <Text style={[ styles.badgeText, { fontSize: 12 } ]}>{cartSize}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate( 'Profile' )
                }} style={

                    [ styles.topButtons ]
                }>
                <MaterialCommunityIcons name="account" size={20} color="white" />
            </TouchableOpacity>

        </View>
    );
}

