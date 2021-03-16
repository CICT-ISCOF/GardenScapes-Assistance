import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import styles from './edit.plant.style'
import BottomSheet from 'react-native-animated-bottom-sheet';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import Margin from '../../../shared/margin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Variety from '../../Add/Plants/variety';
import Inputs from '../../Add/Plants/inputs';
import { Ionicons } from '@expo/vector-icons';
import ConfirmBottomSheet from '../../../shared/confirm'
import firebase from 'firebase';
import Loader from '../../../shared/loader';
import Map from '../../Add/Map';
import Shop from '../../Add/shop';
import SunAndWater from '../../Add/Plants/sun-and-water';


export default function EditPlants( { route }: any ) {

    let { id } = route.params
    const [ data, setData ] = useState( route.params.data )
    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )
    const [ files, setfiles ]: any = useState( [] )
    const [ plantInfo, setplantInfo ]: any = useState( {} )
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    React.useEffect( () => {
        updateData()
    }, [ route ] )

    async function addImages() {
        let result = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [ 4, 3 ],
            quality: 1,
        } );

        if ( !result.cancelled ) {
            setfiles( [ ...files, result ] );
        }
    }

    const MapsRef: any = useRef();
    const [ location, setlocation ]: any = useState( "" )
    const MapSheet = () => (
        <Map
            data={( data: any ) => {
                setlocation( data )
            }}
            initialData={data.location}
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

    const SunAndWaterRef: any = useRef();
    const [ sunAndWater, setsunAndWater ]: any = useState( {} )
    const SunAndWaterSheet = () => (
        <SunAndWater
            initialData={data.sunAndWater}
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
    );

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

    async function update() {
        setLoading( true )
        let images: any = []
        setLoadingText( 'Uploading New Images' )
        for ( let index = 0; index <= files.length - 1; index++ ) {
            const response = await fetch( files[ index ].uri );
            const blob = await response.blob();
            let file = await firebase
                .storage()
                .ref( "plantitas/" + Date.now() )
                .put( blob )
            let photo_url = await file.ref.getDownloadURL();
            images.push( photo_url )
        }
        setLoadingText( 'Merging Images' )
        for ( let index = 0; index <= data.images.length - 1; index++ ) {
            images.push( data.images[ index ] )
        }
        setLoadingText( 'Uploading New Varieties' )
        let varietiesArray: any = []
        for ( let index = 0; index <= varieties.length - 1; index++ ) {
            const response = await fetch( varieties[ index ].image.uri );
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
        setLoadingText( 'Merging Varieties' )
        for ( let index = 0; index <= data.varieties.length - 1; index++ ) {
            varietiesArray.push( data.varieties[ index ] )
        }
        setLoadingText( 'Registiring New Plant Information' )
        firebase.firestore().collection( 'plantitas' ).doc( id ).update( {
            plantInfo: plantInfo,
            images: images,
            varieties: varietiesArray,
            shop: shop,
            location: location,
            sunAndWater: sunAndWater,

        } ).then( () => {
            setLoadingText( 'All Set' )
            updateData()
            setTimeout( () => {
                setfiles( [] )
                setVarieties( [] )
                setLoading( false )
            }, 500 );
        } )
    }

    function updateData() {
        firebase.firestore().collection( 'plantitas' ).doc( id ).get().then( ( plantitas ) => {
            setData( plantitas.data() )
        } )
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors[ colorScheme ].background, }}>
            <Loader text={loadingText} loading={loading} />
            <Margin />
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
                style={{
                    margin: 10
                }}>
                <Ionicons name="arrow-back" size={24} color={Colors[ colorScheme ].text} />
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} >

                <Text style={[ { fontSize: 20, fontWeight: '200', color: Colors[ colorScheme ].text, marginVertical: 20, marginBottom: 10 }, data.images.length == 0 ? { position: 'absolute', left: -500 } : {} ]}>Old Images</Text>

                <ScrollView style={[ styles.imageScrollView, data.images.length == 0 ? { position: 'absolute', left: -500 } : {} ]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        data.images.map( ( image: any, index: any ) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    ConfrimSheetRef.current.open()
                                    let imagesArray = data.images
                                    setconfrimAction( {
                                        choices: [ 'Delete Image' ],
                                        callback: () => {
                                            imagesArray.splice( index, 1 )
                                            firebase.firestore().collection( 'plantitas' ).doc( id ).update( { images: imagesArray } ).then( () => {
                                                ConfrimSheetRef.current.close()
                                                updateData()
                                            } )
                                        }
                                    } )
                                }}>
                                    <Image key={index} style={styles.productImage} source={{ uri: image }} />
                                </TouchableOpacity>
                            )
                        } )
                    }
                </ScrollView>


                <Text style={[ { fontSize: 20, fontWeight: '200', color: Colors[ colorScheme ].text, marginVertical: 20, marginBottom: 10 }, data.varieties.length == 0 ? { position: 'absolute', left: -500 } : {} ]}>Old Varieties</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
                    style={[
                        data.varieties.length == 0 ? { position: 'absolute', left: -500 } : {}
                    ]}>
                    {data.varieties.map( ( variety: any, index: any ) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => {
                                ConfrimSheetRef.current.open()
                                let varietyArray = data.varieties
                                setconfrimAction( {
                                    choices: [ 'Delete Variety' ],
                                    callback: () => {
                                        varietyArray.splice( index, 1 )
                                        firebase.firestore().collection( 'plantitas' ).doc( id ).update( {
                                            varieties: varietyArray
                                        } ).then( () => {
                                            ConfrimSheetRef.current.close()
                                            updateData()
                                        } )
                                    }
                                } )

                            }}>
                                <Image style={styles.cardImage} source={{ uri: variety.uri }} />
                                <Text style={{
                                    textAlign: 'center',
                                    color: Colors[ colorScheme ].text
                                }}>{variety.name}</Text>

                            </TouchableOpacity>
                        )
                    } )}
                </ScrollView>


                <Text style={[ { fontSize: 20, fontWeight: '200', color: Colors[ colorScheme ].text, marginVertical: 20, marginBottom: 10 }, files.length == 0 ? { position: 'absolute', left: -500 } : {} ]}>Newly Uploaded Images</Text>

                <ScrollView style={[ styles.imageScrollView, files.length == 0 ? { position: 'absolute', left: -500 } : {} ]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        files.map( ( image: any, index: any ) => {
                            return (
                                <TouchableOpacity onLongPress={() => {
                                    alert( 'nice' )
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
                    <TouchableOpacity style={styles.smallButtons} onPress={() => { setfiles( [] ) }}>
                        <Text style={styles.smallButtonsText}>Clear Uploaded Images</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => { VarietiesRef.current.open() }}>
                        <Text style={styles.smallButtonsText}>Add Varieties</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => {
                        setVarieties( [] )
                    }}>
                        <Text style={styles.smallButtonsText}>Clear Added Varieties</Text>
                    </TouchableOpacity>

                </ScrollView>



                <Text style={[ { fontSize: 20, fontWeight: '200', color: Colors[ colorScheme ].text, marginVertical: 20, marginBottom: 10 }, varieties.length == 0 ? { position: 'absolute', left: -500 } : {} ]}>New Varieties</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {varieties.map( ( variety: any, index: any ) => {
                        return (
                            <View key={index}>
                                <Image style={styles.cardImage} source={{ uri: variety.image.uri }} />
                                <Text style={{
                                    textAlign: 'center',
                                    color: Colors[ colorScheme ].text
                                }}>{variety.name}</Text>

                            </View>
                        )
                    } )}
                </ScrollView>

                <Inputs
                    type="Edit"
                    data={( data: any ) => {
                        setplantInfo( data )
                    }}
                    texts={''}
                    value={data} />

                <View style={{ paddingHorizontal: 50, marginTop: -50 }}>
                    <TouchableOpacity
                        onPress={() => {
                            update()
                        }}
                        style={styles.button} >
                        <Text style={styles.buttonText}>Update {data.plantInfo.name}</Text>
                    </TouchableOpacity>
                </View>
                <Margin />
                <Margin />
                <Margin />
                <Margin />
                <Margin />
                <Margin />

            </ScrollView>

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
                ref={SunAndWaterRef}
                renderContent={SunAndWaterSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 2}
            />
            <BottomSheet
                ref={shopRef}
                renderContent={shopSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.2}
            />


        </View>
    );
}
