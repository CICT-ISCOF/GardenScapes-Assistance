import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles1 from './map.style'

export default function Map( props: any, ref: any ) {
    const colorScheme = useColorScheme();

    let { width, height } = Dimensions.get( 'window' )

    const [ location, setLocation ] = useState( {
        coords: {
            latitude: 10.7202,
            longitude: 122.5621
        },
    } );

    const [ data, setData ]: any = useState( {
        lat: 10.7202,
        lon: 122.5621,
        display_name: 'Iloilo City'
    } )

    useEffect( () => {
        if ( props.initialData != undefined ) {
            setData( props.initialData )
        }
    }, [] )

    useEffect( () => {
        ( async () => {
            let { status } = await Location.requestPermissionsAsync();
            if ( status !== 'granted' ) {
                alert( 'Permission to access location was denied' );
                return;
            }

            let location: any = await Location.getCurrentPositionAsync( {} );
            setLocation( location );

        } )();
    }, [ data ] );

    function reverseGeoCOde( coordinates: any ) {
        const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.ca7d72d67098fe33153685abf70e35a9&q&lat=${ coordinates.latitude }&lon=${ coordinates.longitude }&format=json`
        axios.get( url ).then( ( response ) => {
            setData( response.data )
        } ).catch( () => {
        } );
    }

    return (
        <View>
            <View style={styles1.bottomSheetHeader} />
            <View
                style={[ { backgroundColor: Colors[ colorScheme ].background, }, styles1.mainContainer ]}>
                <View style={[ styles1.instructions, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <Text style={[ styles1.instructionsText, { color: Colors[ colorScheme ].text } ]}>Please
                    <Text style={{ fontWeight: 'bold' }}> Drag and Drop </Text>
                     the red marker and select your exact Shop Location.</Text>
                </View>


                <View style={[ styles1.locationWrapper, { backgroundColor: Colors[ colorScheme ].background } ]}>
                    <TouchableOpacity
                        onPress={() => {
                            props.data( data )
                            props.blur( true )
                        }}
                        style={[ styles1.location,
                        data.display_name == undefined || data.display_name == '' ?
                            { display: 'none' } : {}
                        ]}>
                        <View style={styles1.locationICon}>
                            <FontAwesome name="map-signs" size={16} color='#DCA669' />
                        </View>
                        <View>
                            <Text style={[ { color: Colors[ colorScheme ].text }, styles1.locationText ]}>{data.display_name}</Text>
                        </View>
                        <View style={styles1.button}>
                            <Text style={{ color: 'white' }}> I'm okay with this</Text>
                        </View>
                    </TouchableOpacity>
                </View>


                <MapView
                    mapType="standard"
                    style={styles1.map}
                    region={{
                        latitude: parseFloat( data.lat ),
                        longitude: parseFloat( data.lon ),
                        latitudeDelta: .060,
                        longitudeDelta: .060 * width / height,
                    }}>

                    <Marker
                        pinColor={"#1ED760"}
                        title={"You are here"}
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                    />

                    <Marker
                        pinColor={"red"}
                        draggable={true}
                        title={"Your Shop"}
                        coordinate={{
                            latitude: parseFloat( data.lat ),
                            longitude: parseFloat( data.lon )
                        }}
                        onDragEnd={( e ) => {
                            let coordinates = e.nativeEvent.coordinate
                            reverseGeoCOde( coordinates )
                        }}
                    />
                </MapView>
            </View>
        </View>
    );

}
