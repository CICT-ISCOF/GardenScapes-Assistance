import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import ShowHeader from '../show-header';
import Ratings from './ratings';
import styles from '../show.style'
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from 'react-native-animated-bottom-sheet';
import ShowPlantGuide from './show-guide'
//@ts-ignore
import OpenMap from "react-native-open-map";
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../shared/loader';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need


export default function ShowPlant( { route }: any ) {
    const { data } = route.params
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ user, setuid ]: any = useState( "" )

    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )

    useEffect( () => {
        ( async () => {
            setuid( await AsyncStorage.getItem( 'users' ) )
        } )()
    }, [] )

    const formatter = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: "PHP",
    } )

    const GuidesRef: any = useRef();
    const GuideSheet = () => (
        <ShowPlantGuide data={data} />
    );

    const ImageViewerRef: any = useRef();
    const [ image, setimage ] = useState( '' )
    const [ name, setname ] = useState( '' )
    const ImageViewerSheet = () => (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: Colors[ colorScheme ].bg,
                alignSelf: 'center',
                transform: [ { translateY: -10 } ]
            }} />
            <View style={{
                backgroundColor: Colors[ colorScheme ].bg,
                padding: 20,
                height: 850,
                alignItems: 'center',
            }}>

                <View style={{
                    flexDirection: 'row'
                }}>
                    <Text style={{ textAlign: 'left', fontSize: 20, fontWeight: '600', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', flex: 3 }}>{name}</Text>
                </View>
                <Image style={{
                    width: Dimensions.get( 'screen' ).width,
                    height: Dimensions.get( 'screen' ).height - 150,
                    marginTop: 20
                }} source={{ uri: image }} />
            </View>
        </View>
    );
    return (
        <View>
            <Loader text={loadingText} loading={loading} />
            <ScrollView style={{ backgroundColor: Colors[ colorScheme ].bg }}>
                <ShowHeader />
                <ScrollView horizontal={true} style={{ marginTop: -60, backgroundColor: 'gray' }} showsHorizontalScrollIndicator={false}>
                    {
                        data.images.map( ( image: any, key: any ) => {
                            return (
                                <Image key={key} style={styles.images} source={{ uri: image }} />
                            )
                        } )
                    }
                </ScrollView>
                <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <Text style={styles.price}>{formatter.format( parseFloat( data.plantInfo.price ) )} </Text>
                    <TouchableOpacity
                        onPress={() => {
                            OpenMap.show( {
                                latitude: data.location.lat,
                                longitude: data.location.lon,
                                title: data.location.display_name,
                                cancelText: 'Close',
                                actionSheetTitle: 'Chose app',
                                actionSheetMessage: 'Available applications '
                            } );
                        }}
                        style={[ styles.badge, data.shop == undefined || data.shop == null || data.shop == '' ? { display: 'none' } : {} ]}>
                        <Text style={[ styles.badgeText, ]}>{data.shop || 'Shop Not Set'}</Text>
                    </TouchableOpacity>
                    <Text style={[ styles.name, { color: Colors[ colorScheme ].text } ]}>{data.plantInfo.name}</Text>
                </View>
                <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background, flexDirection: 'row' } ]}>
                    <Ratings sun={data.sunAndWater.sun} water={data.sunAndWater.water} />
                    <TouchableOpacity
                        onPress={() => {
                            GuidesRef.current.open()
                        }}
                        style={styles.guide}>
                        <Feather name="help-circle" size={24} color="gray" />
                        <Text style={{
                            fontSize: 10,
                            marginTop: 7,
                            color: Colors[ colorScheme ].text
                        }}>Guide</Text>
                    </TouchableOpacity>
                </View>
                <View style={[ styles.card, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <Text style={[ styles.title, { color: Colors[ colorScheme ].text } ]}>Introduction</Text>
                    <Text style={{
                        color: 'gray'
                    }}>{data.plantInfo.plant_introduction}</Text>
                </View>
                <View style={{ backgroundColor: Colors[ colorScheme ].background }} >
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            data.varieties.map( ( variety: any, index: any ) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => {
                                            setimage( variety.uri )
                                            setname( variety.name )
                                            ImageViewerRef.current.open()
                                        }}>
                                        <Image style={styles.cardImage} source={{ uri: variety.uri }} />
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: Colors[ colorScheme ].text
                                            }}>
                                            {variety.name}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            } )
                        }
                    </ScrollView>
                </View>
                <View style={{ height: 80 }} />
            </ScrollView >
            <View style={[ styles.footer, styles.card, { backgroundColor: Colors[ colorScheme ].background, paddingTop: -0 } ]}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate( 'Chatbox', {
                            chatBot: false,
                            uid: data.uid, data: null
                        } )
                    }}
                    style={{
                        marginLeft: 10,
                        borderRightWidth: 1,
                        paddingRight: 20,
                        borderRightColor: 'rgba(150,150,150,.2)',
                    }}>
                    <Ionicons name="chatbubble-outline" size={24} color={Colors[ colorScheme ].text} />
                    <Text style={{
                        color: Colors[ colorScheme ].text
                    }}>Chat</Text>
                </TouchableOpacity>
                <View style={{ flex: 3 }}></View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate( 'Chatbox', {
                            chatBot: true,
                            uid: data.uid,
                            data: data
                        } )
                    }}
                    style={[ styles.button, {
                        backgroundColor: '#FFC000'
                    } ]}
                >
                    <Text
                        style={{
                            fontWeight: '500'
                        }}
                    >
                        Buy Now
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => {
                        setLoading( true )
                        setLoadingText( 'Adding to Cart' )
                        await firebase.firestore().collection( 'cart' ).add( {
                            data,
                            uid: JSON.parse( user ).uid,
                            type: 'plant'
                        } ).then( () => {
                            setLoading( false )
                        } )
                    }}
                    style={[ styles.button, {
                        backgroundColor: '#E61487'
                    } ]}>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
            <BottomSheet
                ref={GuidesRef}
                renderContent={GuideSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
            <BottomSheet
                ref={ImageViewerRef}
                renderContent={ImageViewerSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />

        </View>
    );
}
