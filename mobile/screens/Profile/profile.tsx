import React, { useState, useEffect, useRef } from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../shared/header-titile'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './profile.style'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ uid, setuid ]: any = useState( "" )
    const [ user, setUser ]: any = useState( "" )

    useEffect( () => {
        ( async () => {
            await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
                setuid( JSON.parse( user ).uid )
                getUser()
            } )
        } )()
    }, [] )

    function getUser() {
        firebase.firestore().collection( 'users' )
            .where( 'uid', '==', uid ).
            onSnapshot( ( users: any ) => {
                users.forEach( ( user: any ) => {
                    setUser( user.data() )
                } )
            } )
    }

    return (
        <View style={{ flex: 1, }}>
            <ScrollView style={{ position: 'relative', zIndex: 1, flex: 1, backgroundColor: Colors[ colorScheme ].background, }}>
                <HeaderTitle back={true} title='Jamel Eid Yassin' />
                <Image
                    blurRadius={9}
                    style={styles.cover}
                    source={require( '../../assets/placeholders/green.png' )}
                />
                <TouchableOpacity style={[ styles.profileContainerMain, {
                    backgroundColor: Colors[ colorScheme ].background,
                    borderColor: Colors[ colorScheme ].background
                } ]}>
                    <View style={styles.profileContainer}>
                        <Image
                            style={[ styles.profile, { borderColor: Colors[ colorScheme ].background } ]}
                            source={require( '../../assets/placeholders/green.png' )}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[ styles.name, { color: Colors[ colorScheme ].text } ]}>Juan De La Cruz </Text>
                <Text style={[ styles.address, { color: Colors[ colorScheme ].text }, ]}>  So-ol, Baortac Nuevo </Text>
                <View style={styles.tabContainer}>
                    <View style={styles.tab}>
                        <TouchableOpacity onPress={() => { }} >
                            <Text style={[ styles.tabTitle, { color: Colors[ colorScheme ].text } ]}> for Plantitos/Plantitas  </Text>
                            <Text style={styles.tabNumber}>5</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tab}>
                        <TouchableOpacity onPress={() => { }} >
                            <Text style={[ styles.tabTitle, { color: Colors[ colorScheme ].text } ]}>Normal Products</Text>
                            <Text style={styles.tabNumber}>5</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
