import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderImage from '../../shared/header-image';
import { } from 'react-native-gesture-handler';
import styles from './cart.style'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmBottomSheet from '../../shared/confirm';
import BottomSheet from 'react-native-animated-bottom-sheet';
import Loader from '../../shared/loader';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need

export default function Cart( { route }: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ played, setPlayed ]: any = React.useState( false );
    const [ sound, setSound ]: any = React.useState();
    const [ user, setuid ]: any = useState( "" )
    const [ carts, setcarts ]: any = useState( [] )
    const [ cartIds, setcartIds ]: any = useState( [] )
    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )

    useEffect( () => {
        ( async () => {
            setuid( await AsyncStorage.getItem( 'users' ) )
            getCart()
        } )()
    }, [] )

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'focus', () => {
            if ( played == false ) {
                playSound()
                setPlayed( true )
            }
        } )
        return () => {
            unsubscribe()
        }
    }, [ navigation ] )

    const formatter = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: "PHP",
    } )

    async function getCart() {
        setcarts( [] )
        setcartIds( [] )
        firebase.firestore().collection( 'cart' )
            .onSnapshot( ( products ) => {
                let cartArray: any = []
                let cartArrayId: any = []
                products.forEach( ( doc ) => {
                    cartArray.push( doc.data() )
                    cartArrayId.push( doc.id )
                } )
                setcarts( cartArray )
                setcartIds( cartArrayId )
            } )
    }

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/tap.mp3' )
        );
        setSound( sound );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }

    const ConfrimSheetRef: any = useRef();
    const [ confrimAction, setconfrimAction ]: any = useState( {} )
    const ConfirmSheet = () => (
        <ConfirmBottomSheet
            choices={confrimAction.choices}
            blur={( value: any ) => {
                if ( value == true ) {
                    ConfrimSheetRef.current.close()
                }
            }}
            calback={async () => {
                confrimAction.callback()
            }}
        />
    )

    return (
        <View style={{ backgroundColor: Colors[ colorScheme ].bg }}>
            <Loader text={loadingText} loading={loading} />
            <HeaderImage title="My Cart" color="pink" back={true} />
            <View style={
                { height: 10 }
            } />
            <SwipeListView
                style={{ height: '100%' }}
                showsVerticalScrollIndicator={false}
                data={carts}
                keyExtractor={carts.index}
                renderItem={( data: any, index: any ) => (
                    <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background }, data.item.uid == JSON.parse( user ).uid ? {} : { position: 'absolute', left: -500 } ]}>
                        <TouchableOpacity onPress={() => {
                            if ( data.item.type == 'product' ) {
                                return navigation.navigate( 'ShowProduct', {
                                    data: data.item.data
                                } )
                            }
                            navigation.navigate( 'ShowPlant', {
                                data: data.item.data
                            } )
                        }}>
                            <Image style={styles.image} source={{ uri: data.item.data.images[ 0 ] }} />
                        </TouchableOpacity>
                        <View style={styles.nameContainer}>
                            <Text style={[ styles.name, { color: Colors[ colorScheme ].text } ]}>{data.item.data.plantInfo.name}</Text>
                            <Text style={styles.qtty}>Qtty</Text>
                            <View style={styles.qttyContainer}>
                                <TouchableOpacity
                                    onPress={() => {

                                        if ( data.item.quantities != undefined && data.item.quantities != 0 ) {
                                            firebase.firestore().collection( 'cart' ).doc( cartIds[ data.index ] ).get().then( ( cart: any ) => {
                                                let quantity = cart.data()[ 'quantities' ] - 1

                                                firebase.firestore().collection( 'cart' ).doc( cartIds[ data.index ] ).update( {
                                                    quantities: quantity
                                                } )
                                            } )
                                        }
                                    }}
                                    style={styles.qttyButton}>
                                    <Text style={[ styles.qttyButtonText, { color: Colors[ colorScheme ].text } ]}>-</Text>
                                </TouchableOpacity>
                                <Text style={[ styles.qttyButtonText1, { color: Colors[ colorScheme ].text } ]}>{data.item.quantities == undefined ? 0 : data.item.quantities}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if ( data.item.quantities != undefined && data.item.quantities != 0 ) {
                                            firebase.firestore().collection( 'cart' ).doc( cartIds[ data.index ] ).get().then( ( cart: any ) => {
                                                let quantity = cart.data()[ 'quantities' ] + 1
                                                if ( quantity > cart.data()[ 'data' ][ 'plantInfo' ][ 'quantities' ] ) {
                                                    return alert( `Requested quantity exceeded seller's posted quantity` )
                                                }
                                                firebase.firestore().collection( 'cart' ).doc( cartIds[ data.index ] ).update( {
                                                    quantities: quantity
                                                } )
                                            } )
                                        } else {
                                            firebase.firestore().collection( 'cart' ).doc( cartIds[ data.index ] ).update( { quantities: 1 } )

                                        }
                                    }}
                                    style={styles.qttyButton}>
                                    <Text style={[ styles.qttyButtonText, { color: Colors[ colorScheme ].text } ]}>+</Text>
                                </TouchableOpacity>
                            </View >
                            <Text style={[ styles.price, { fontWeight: '400', fontSize: 13, marginTop: -10, } ]}> {formatter.format( parseFloat( data.item.data.plantInfo.price ) )}</Text>

                        </View>
                        <View style={styles.priceContainer}>
                            <Text>Total</Text>
                            <Text style={[ styles.price, { color: 'red' } ]}>
                                {formatter.format(
                                    parseFloat( data.item.data.plantInfo.price ) *
                                    parseFloat( data.item.quantities == undefined ? 0 : data.item.quantities )
                                )}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate( 'Chatbox', {
                                        chatBot: true,
                                        uid: data.item.data.uid,
                                        data: data.item.data
                                    } )
                                }}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                renderHiddenItem={( data: any, index: any ) => (
                    <View style={{ position: 'absolute', right: 0, width: 75, alignSelf: 'center', }}>
                        <TouchableOpacity onPress={() => {
                            ConfrimSheetRef.current.open()
                            setconfrimAction( {
                                choices: [ 'Remove Item' ],
                                callback: () => {
                                    setLoading( true )
                                    setLoadingText( 'Removing Item in cart...' )
                                    firebase.firestore().collection( 'cart' ).doc( cartIds[ data.index ] ).delete()
                                        .then( () => {
                                            setLoading( false )
                                            ConfrimSheetRef.current.close()
                                        } )
                                }
                            } )
                        }} style={{
                            transform: [ { translateY: 40 } ]
                        }}>
                            <Ionicons style={{ textAlign: 'center', }} name="trash" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                )}
                rightOpenValue={-75}
                closeOnRowPress={true}
                closeOnScroll={true}
                disableRightSwipe={true}
                useAnimatedList={true}
                useNativeDriver={true}
            />
            <BottomSheet
                ref={ConfrimSheetRef}
                renderContent={ConfirmSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3.5}
            />



        </View>
    );
}

