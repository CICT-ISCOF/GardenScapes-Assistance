import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderImage from '../../../shared/header-image';
import { } from 'react-native-gesture-handler';
import styles from './plant.style'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'react-native-animated-bottom-sheet';
import ConfirmBottomSheet from '../../../shared/confirm';
import Loader from '../../../shared/loader';

export default function PlantList() {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [ user, setuid ]: any = useState( "" )
    const [ plants, setplants ]: any = useState( [] )
    const [ plantsId, setplantsId ] = useState( [] )
    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )

    useEffect( () => {
        ( async () => {
            setuid( await AsyncStorage.getItem( 'users' ) )
        } )()
        getPlantitas()
    }, [] )


    const formatter = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: "PHP",
    } )

    async function getPlantitas() {
        setplants( [] )
        setplantsId( [] )
        await firebase.firestore().collection( 'plantitas' )
            .onSnapshot( ( plants ) => {
                let plantsArray: any = []
                let plantsArrayID: any = []
                plants.forEach( ( doc ) => {
                    plantsArray.push( doc.data() )
                    plantsArrayID.push( doc.id )

                } )
                setplants( plantsArray )
                setplantsId( plantsArrayID )
            } )
    }

    const ConfrimSheetRef: any = useRef();
    const [ confrimAction, setconfrimAction ]: any = useState( {} )
    const ConfirmSheet = () => {
        return (
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
    }

    return (
        <View>
            <Loader text={loadingText} loading={loading} />
            <HeaderImage title="My Plantios/Plantitas" color="flat-green" back={true} />
            <View style={
                { height: 10 }
            } />
            <SwipeListView
                style={{ height: '100%' }}
                showsVerticalScrollIndicator={false}
                data={plants}
                keyExtractor={plants.index}
                renderItem={( data: any, index: any ) => (
                    <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background }, data.item.uid == JSON.parse( user ).uid ? {} : { position: 'absolute', left: -500 } ]}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate( 'ShowPlant', {
                                data: data.item
                            } )
                        }}>
                            <Image style={styles.image} source={{ uri: data.item.images[ 0 ] }} />
                        </TouchableOpacity>
                        <View style={styles.nameContainer}>
                            <Text style={[ styles.name, { color: Colors[ colorScheme ].text } ]}>{data.item.plantInfo.name}</Text>
                            <Text style={styles.qtty}>Qtty : {data.item.plantInfo.quantities}</Text>
                            <Text style={[ styles.price, { marginTop: 10 } ]}>
                                <Text style={[ styles.price, { marginTop: 10 } ]}>
                                    {formatter.format( parseFloat(
                                        data.item.plantInfo.price
                                    ) )}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                navigation.navigate( 'EditPlants', {
                                    data: data.item
                                } )
                            }}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                renderHiddenItem={( data: any, index: any ) => (
                    <View style={{
                        position: 'absolute',
                        right: 0,
                        width: 75,
                        alignSelf: 'center',
                    }}>
                        <TouchableOpacity onPress={() => {
                            ConfrimSheetRef.current.open()
                            setconfrimAction( {
                                choices: [ 'Delete Plantita' ],
                                callback: () => {
                                    setLoading( true )
                                    setLoadingText( 'Deleting Plantita...' )
                                    firebase.firestore().collection( 'plantitas' ).doc( plantsId[ data.index ] ).delete()
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