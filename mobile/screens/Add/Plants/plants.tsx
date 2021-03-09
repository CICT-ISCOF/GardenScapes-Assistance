import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, Platform, Dimensions, Animated, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import BottomSheet from 'react-native-animated-bottom-sheet';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import styles from './plants.style'
import SunAndWater from './sun-and-water'
import Variety from './variety'
import Inputs from './inputs'
import firebase from 'firebase';
import "firebase/firestore";

export default function AddPlants( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    useEffect( () => {
        ( async () => {
            if ( Platform.OS !== 'web' ) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if ( status !== 'granted' ) {
                    alert( 'Sorry, we need camera roll permissions to make this work!' );
                }
            }
        } )();
    }, [] );

    const SunAndWaterRef: any = useRef();
    const [ sunAndWater, setsunAndWater ]: any = useState( {} )
    const SunAndWaterSheet = () => (
        <SunAndWater
            data={ ( data: any ) => {
                setsunAndWater( data )
            } }
            blur={ ( data: any ) => {
                if ( data ) {
                    SunAndWaterRef.current.close()
                }
            } }
        />
    );

    const VarietiesRef: any = useRef();
    const [ varieties, setVarieties ]: any = useState( [] )
    const VarietySheet = () => (
        <Variety
            data={ ( data: any ) => {
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
            } }
            blur={ ( value: any ) => {
                if ( value ) {
                    VarietiesRef.current.close()
                }
            } }
        />
    );

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

        firebase.firestore().collection( 'plantitas' ).add( {
            plantInfo: data.plantInfo,
            category: 'Plantitas'
        } ).then( ( doc: any ) => {
            firebase.firestore().collection( 'plantita-images' ).add( {
                platita_id: doc.id,
                images: images
            } )
            firebase.firestore().collection( 'varieties' ).add( {
                platita_id: doc.id,
                varieties: varietiesArray
            } )
        } )
    }


    return (
        <ScrollView showsVerticalScrollIndicator={ false } style={ [
            props.visibility != true ? {
                display: 'none'
            } : {}
        ] }>
            <ScrollView style={ [ styles.imageScrollView, files.length == 0 ? { position: 'absolute', left: -500 } : {} ] } horizontal={ true } showsHorizontalScrollIndicator={ false } >
                {
                    files.map( ( image: any, index: any ) => {
                        return (
                            <Image key={ index } style={ styles.productImage } source={ { uri: image[ 'uri' ] } } />
                        )
                    } )
                }
            </ScrollView>

            <ScrollView style={ styles.buttonScrollView } horizontal={ true } showsHorizontalScrollIndicator={ false }>
                <TouchableOpacity style={ styles.smallButtons } onPress={ () => {
                    addImages()
                } }>
                    <Text style={ styles.smallButtonsText }>Add Images</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ styles.smallButtons } onPress={ () => SunAndWaterRef.current.open() } >
                    <Text style={ styles.smallButtonsText }>Sun & Water Needed</Text>
                </TouchableOpacity>

                <TouchableOpacity style={ styles.smallButtons } onPress={ () => { VarietiesRef.current.open() } } >
                    <Text style={ styles.smallButtonsText }>Varieties</Text>
                </TouchableOpacity>



                <TouchableOpacity style={ styles.smallButtons } onPress={ () => {
                    setfiles( [] )
                } }>
                    <Text style={ styles.smallButtonsText }>Clear Images</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.smallButtons } onPress={ () => {
                    setVarieties( [] )
                } }>
                    <Text style={ styles.smallButtonsText }>Clear Varieties</Text>
                </TouchableOpacity>
            </ScrollView>


            <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false }>
                { varieties.map( ( variety: any, index: any ) => {
                    return (
                        <View key={ index }>
                            <Image style={ styles.cardImage } source={ { uri: variety.image.uri } } />
                            <Text style={ {
                                textAlign: 'center',
                                color: Colors[ colorScheme ].text
                            } }>{ variety.name }</Text>

                        </View>
                    )
                } ) }
            </ScrollView>


            <Inputs data={ ( data: any ) => {
                setplantInfo( data )
            } } />


            <BottomSheet
                ref={ SunAndWaterRef }
                renderContent={ SunAndWaterSheet }
                visibleHeight={ Dimensions.get( 'window' ).height / 2 }
            />

            <BottomSheet
                ref={ VarietiesRef }
                renderContent={ VarietySheet }
                visibleHeight={ Dimensions.get( 'window' ).height / 1.5 }
            />

            <View style={ { paddingHorizontal: 50, marginTop: -50 } }>
                <TouchableOpacity onPress={ () => {
                    sell()
                } } style={ styles.button } >
                    <Text style={ styles.buttonText }>Confirm & Sell</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>





    );
}
