import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, Platform, Dimensions, Animated, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'react-native-animated-bottom-sheet';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import styles from './plants.style'
import SunAndWater from './sun-and-water'
import Variety from './variety'
import Inputs from './inputs'
import firebase from 'firebase';
import "firebase/firestore";
import ConfirmBottomSheet from '../../../shared/confirm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from '../Map';
import Shop from '../shop';

export default function AddPlants( props: any ) {
    const colorScheme = useColorScheme();
    const [ user, setuid ]: any = useState( "" )
    useEffect( () => {
        ( async () => {
            if ( Platform.OS !== 'web' ) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if ( status !== 'granted' ) {
                    alert( 'Sorry, we need camera roll permissions to make this work!' );
                }
                setuid( await AsyncStorage.getItem( 'users' ) )
            }
        } )()
    }, [] )
    const SunAndWaterRef: any = useRef();
    const [ sunAndWater, setsunAndWater ]: any = useState( {} )
    const SunAndWaterSheet = () => (
        <SunAndWater
            data={( data: any ) => {
                setsunAndWater( data )
            }}
            blur={( data: any ) => {
                if ( data ) {
                    SunAndWaterRef.current.close()
                }
            }}
        />
    )
    const VarietiesRef: any = useRef();
    const [ varieties, setVarieties ]: any = useState( [] )
    const VarietySheet = () => (
        <Variety
            data={( data: any ) => {
                setTimeout( async () => {
                    let result = await ImagePicker.launchImageLibraryAsync( {
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [ 4, 3 ],
                        quality: 1,
                    } );

                    if ( !result.cancelled ) {
                        setVarieties( [ ...varieties, { name: data, image: result } ] );
                    }
                }, 500 );
            }}
            blur={( value: any ) => {
                if ( value ) {
                    VarietiesRef.current.close()
                }
            }}
        />
    )
    const MapsRef: any = useRef();
    const [ location, setlocation ]: any = useState( "" )
    const MapSheet = () => (
        <Map
            data={( data: any ) => {
                setlocation( data )
            }}
            blur={( value: any ) => {
                if ( value ) {
                    MapsRef.current.close()
                    setTimeout( () => {
                        shopRef.current.open()
                    }, 300 );
                }
            }}
        />
    )
    const shopRef: any = useRef();
    const [ shop, setShop ]: any = useState( "" )
    const shopSheet = () => (
        <Shop
            data={( data: any ) => {
                setShop( data )
            }}
            blur={( value: any ) => {
                if ( value ) {
                    shopRef.current.close()
                }
            }}
        />
    )
    const [ files, setfiles ]: any = useState( [] )
    async function addImages() {
        let result = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [ 4, 3 ],
            quality: 1,
        } )
        if ( !result.cancelled ) {
            setfiles( [ ...files, result ] );
        }
    }
    const [ plantInfo, setplantInfo ]: any = useState( {} )
    async function sell() {
        if ( files.length == 0 ) {
            alert( 'Images could not be empty' ); return
        }
        if ( location.display_name == undefined ) {
            MapsRef.current.open()
        }
        if ( sunAndWater.sun == undefined || sunAndWater.water == undefined ) {
            SunAndWaterRef.current.open(); return
        }
        if ( varieties.length == 0 ) {
            VarietiesRef.current.open(); return
        }
        if ( plantInfo.name == undefined ) {
            alert( 'Please fill up plant information' ); return
        }
        if (
            plantInfo.name == '' || plantInfo.plant_introduction == '' ||
            plantInfo.growing == '' || plantInfo.caring == '' ||
            plantInfo.price == '' || plantInfo.quantities == ''
        ) {
            alert( 'One or more fields in Product Information should not be left empty' ); return
        }
        let data = {
            images: files,
            sunAndWater: sunAndWater,
            varieties: varieties,
            plantInfo: plantInfo,
            category: 'Plantitas'
        }
        props.loading( true )
        props.loadingText( "Uploading Images..." )

        let images: any = []
        for ( let index = 0; index <= files.length - 1; index++ ) {
            const response = await fetch( data.images[ index ].uri );
            const blob = await response.blob();

            let file = await firebase
                .storage()
                .ref( "plantitas/" + Date.now() )
                .put( blob )

            let photo_url = await file.ref.getDownloadURL();
            images.push( photo_url )
        }
        props.loadingText( "Saving Varities..." )

        let varietiesArray: any = []
        for ( let index = 0; index <= varieties.length - 1; index++ ) {
            const response = await fetch( data.varieties[ index ].image.uri );
            const blob = await response.blob();
            let file = await firebase
                .storage()
                .ref( "varieties/" + Date.now() )
                .put( blob )

            let photo_url = await file.ref.getDownloadURL();
            varietiesArray.push( {
                uri: photo_url,
                name: varieties[ index ].name
            } )
        }
        props.loadingText( "Regestering Plant Information..." )
        firebase.firestore().collection( 'plantitas' ).add( {
            plantInfo: data.plantInfo,
            sunAndWater: sunAndWater,
            category: 'Plantitas',
            images: images,
            varieties: varietiesArray,
            uid: JSON.parse( user ).uid,
            shop: shop,
            location: location
        } ).then( () => {
            props.loading( "All Set" )
            setTimeout( () => {
                props.loading( false )
            }, 300 );
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
        <ScrollView showsVerticalScrollIndicator={false} style={[
            props.visibility != true ? {
                display: 'none'
            } : {}
        ]}>
            <ScrollView style={[ styles.imageScrollView, files.length == 0 ? { position: 'absolute', left: -500 } : {} ]} horizontal={true} showsHorizontalScrollIndicator={false} >
                {
                    files.map( ( image: any, index: any ) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                ConfrimSheetRef.current.open()
                                let imagesArray = files
                                setconfrimAction( {
                                    choices: [ 'Delete Image' ],
                                    callback: () => {
                                        imagesArray.splice( index, 1 )
                                        setfiles( imagesArray )
                                        ConfrimSheetRef.current.close()
                                        setfiles( imagesArray )
                                    }
                                } )

                            }}>
                                <Image key={index} style={styles.productImage} source={{ uri: image[ 'uri' ] }} />
                            </TouchableOpacity>
                        )
                    } )
                }
            </ScrollView>
            <ScrollView style={styles.buttonScrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity style={styles.smallButtons} onPress={() => { addImages() }}>
                    <Text style={styles.smallButtonsText}>Add Images</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButtons} onPress={() => { MapsRef.current.open() }}>
                    <Text style={styles.smallButtonsText}>Shop Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButtons} onPress={() => SunAndWaterRef.current.open()} >
                    <Text style={styles.smallButtonsText}>Sun & Water Needed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButtons} onPress={() => { VarietiesRef.current.open() }} >
                    <Text style={styles.smallButtonsText}>Varieties</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButtons} onPress={() => { setfiles( [] ) }}>
                    <Text style={styles.smallButtonsText}>Clear Images</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.smallButtons} onPress={() => { setVarieties( [] ) }}>
                    <Text style={styles.smallButtonsText}>Clear Varieties</Text>
                </TouchableOpacity>
            </ScrollView>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {varieties.map( ( variety: any, index: any ) => {
                    return (
                        <TouchableOpacity key={index}
                            onPress={() => {
                                ConfrimSheetRef.current.open()
                                let varietyArray = varieties
                                setconfrimAction( {
                                    choices: [ 'Delete Variety' ],
                                    callback: () => {
                                        varietyArray.splice( index, 1 )
                                        setVarieties( varietyArray )
                                        ConfrimSheetRef.current.close()
                                        setVarieties( varietyArray )
                                    }
                                } )
                            }}>
                            <Image style={styles.cardImage} source={{ uri: variety.image.uri }} />
                            <Text style={{
                                textAlign: 'center',
                                color: Colors[ colorScheme ].text
                            }}>{variety.name}</Text>

                        </TouchableOpacity>
                    )
                } )}
            </ScrollView>
            <Inputs data={( data: any ) => {
                setplantInfo( data )
            }} />
            <BottomSheet
                ref={SunAndWaterRef}
                renderContent={SunAndWaterSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 2}
            />
            <BottomSheet
                ref={VarietiesRef}
                renderContent={VarietySheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.5}
            />
            <BottomSheet
                ref={ConfrimSheetRef}
                renderContent={ConfirmSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3.5}
            />
            <BottomSheet
                ref={MapsRef}
                renderContent={MapSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 70}
            />
            <BottomSheet
                ref={shopRef}
                renderContent={shopSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.2}
            />
            <View style={{ paddingHorizontal: 30, marginTop: -50, marginBottom: 250 }}>
                <TouchableOpacity
                    onPress={() => {
                        sell()
                    }} style={styles.button} >
                    <Text style={styles.buttonText}>Confirm & Sell</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
