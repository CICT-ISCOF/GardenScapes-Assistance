import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker, Polygon } from 'react-native-maps';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function Map( props: any, ref: any ) {
    const colorScheme = useColorScheme();

    const [ location, setLocation ] = useState( {
        coords: { latitude: 0, longitude: 0 },
        longitude: 0,
        latitudeDelta: 0,
    } );
    const [ errorMsg, setErrorMsg ] = useState( '' );
    const [ type, setType ]: any = useState( 'Standard' );
    const [ showInput, setshowInput ] = useState( false )
    const [ query, setquery ] = useState( '' )
    const [ data, setData ]: any = useState( [
        {
            lat: 11.0050,
            lon: 122.5373,
            display_name: 'Iloilo Province',
        }
    ] );

    useEffect( () => {
        ( async () => {
            let { status } = await Location.requestPermissionsAsync();
            if ( status !== 'granted' ) {
                setErrorMsg( 'Permission to access location was denied' );
                return;
            }

            let location: any = await Location.getCurrentPositionAsync( {} );
            setLocation( location );
        } )();

        changeMap()

    }, [ query ] );

    function changeMap() {
        if ( props.requestLocation != ' ' ) {
            const url = `https://api.locationiq.com/v1/autocomplete.php?key=pk.ca7d72d67098fe33153685abf70e35a9&q&q=
            ${ encodeURI( query ) }
            &limit=5`
            axios.get( url ).then( ( response ) => {
                setData( response.data )
            } ).catch( ( error ) => {
                console.error( error )
            } );
        }
    }


    const styles = StyleSheet.create( {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        map: {
            width: Dimensions.get( 'window' ).width,
            height: Dimensions.get( 'window' ).height,
            position: 'absolute',
            top: 0,
        },
        button: {
            backgroundColor: Colors[ colorScheme ].background,
            padding: 7,
            borderRadius: 3,
            marginRight: 10,
            minWidth: 80,
            paddingVertical: 7,
            alignItems: 'center',
            paddingHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }
    } );

    function reverseGeoCOde( coordinates: any ) {
        const url = `https://us1.locationiq.com/v1/reverse.php?key=pk.ca7d72d67098fe33153685abf70e35a9&q&lat=${ coordinates.latitude }&lon=${ coordinates.longitude }&format=json`
        axios.get( url ).then( ( response ) => {
            setData( [ response.data ] )
            setquery( response.data.display_name )
            setshowInput( true )
        } ).catch( ( error ) => {
            console.error( error )
        } );
    }

    return (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                transform: [ { translateY: -10 } ]
            }} />
            <View
                style={{
                    backgroundColor: Colors[ colorScheme ].background,
                    padding: 20,
                    height: 850,
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        position: 'relative',
                        zIndex: 9,
                        alignItems: 'center'
                    }}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            setType( 'standard' )
                        }}  >
                        <Text style={{ color: Colors[ colorScheme ].text }}>Standard</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            setType( 'satellite' )
                        }}>
                        <Text style={{ color: Colors[ colorScheme ].text }}>Satelite</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            setType( 'hybrid' )
                        }} >
                        <Text style={{ color: Colors[ colorScheme ].text }}>Hybrid</Text>
                    </TouchableOpacity>
                </View>

                <View style={{
                    position: 'relative', zIndex: 20, width: '100%', backgroundColor: Colors[ colorScheme ].background, borderRadius: 10, flexDirection: 'row', marginTop: 20, alignItems: 'center', paddingLeft: 10, shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                }}>
                    <Ionicons name="md-search-outline" size={19} color="gray" />
                    <TextInput
                        style={{
                            padding: 10,
                            width: '90%',
                            color: Colors[ colorScheme ].text
                        }}
                        onFocus={() => {
                            setshowInput( true )
                        }}
                        onChangeText={( text ) => {
                            setquery( text )
                        }}
                        placeholderTextColor="gray"
                        value={query}
                        selectionColor={'#08AD4F'}
                        placeholder="Searh for a place or address"
                        clearButtonMode="always"
                    />
                </View>

                <View style={[ {
                    flexDirection: 'row',
                    position: 'relative',
                    zIndex: 9,
                    alignItems: 'center',
                    backgroundColor: Colors[ colorScheme ].background,
                    width: '100%',
                    paddingTop: 40,
                    marginTop: -20,
                    borderRadius: 10,
                }, showInput == true ? {} : { display: 'none' } ]}>
                    {
                        data.map( ( data: any, key: any ) => {
                            return (
                                <TouchableOpacity key={key}
                                    onPress={() => {
                                        setquery( data.display_name )
                                        setshowInput( false )
                                        alert( JSON.stringify( data ) )
                                        props.data( data )

                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: 'rgba(150,150,150,.1)', borderBottomWidth: 1, width: '100%', padding: 10 }}>
                                    <View style={{
                                        padding: 4,
                                        borderRadius: 50,
                                        backgroundColor: 'rgba(220,166,105,.1)'
                                    }}>
                                        <FontAwesome name="map-signs" size={16} color='#DCA669' />

                                    </View>
                                    <View>
                                        <Text style={{ color: Colors[ colorScheme ].text, marginLeft: 20, width: '45%' }}>{data.display_name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        } )
                    }
                </View>


                <MapView
                    region={{
                        latitude: data[ 0 ].lat || location.coords.latitude,
                        longitude: data[ 0 ].lon || location.coords.longitude,
                        latitudeDelta: 0.922,
                        longitudeDelta: 0.421,
                    }}
                    mapType={type}
                    style={styles.map}>

                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        pinColor={"#1ED760"}
                        title={"You are here"}
                    />

                    <Marker
                        coordinate={{
                            latitude: data[ 0 ].lat,
                            longitude: data[ 0 ].lon
                        }}
                        pinColor={"red"}
                        title={data[ 0 ].display_name}
                        draggable={true}
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
