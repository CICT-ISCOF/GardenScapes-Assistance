import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import styles from '../Products/edit.product.style'
import BottomSheet from 'react-native-animated-bottom-sheet';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import Margin from '../../../shared/margin';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import ProductInputs from '../../Add/Products/inputs-products';
import { Ionicons } from '@expo/vector-icons';
import ConfirmBottomSheet from '../../../shared/confirm'
import firebase from 'firebase';
import Loader from '../../../shared/loader';
import Map from '../../Add/Map';
import Shop from '../../Add/shop';
import SunAndWater from '../../Add/Plants/sun-and-water';
import LayoutIdeas from '../../Add/Products/layout-ideas';
import Companion from '../../Add/Products/companion';
import GrowthCalendar from '../../Add/Products/growth-calendar';
import GrowthCalendarGrowing from '../../Add/Products/growth-calendar-growing';
import Guide from '../../Add/Products/guide';



export default function EditProducts( { route }: any ) {
    let { id } = route.params

    const [ data, setData ] = useState( route.params.data )

    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )
    const [ files, setfiles ]: any = useState( [] )
    const [ plantInfo, setplantInfo ]: any = useState( data.plantInfo )
    const colorScheme = useColorScheme();
    const navigation = useNavigation();


    React.useEffect( () => {
        updateData()
    }, [ route ] )

    function updateData() {
        firebase.firestore().collection( 'product' ).doc( id ).get().then( ( products ) => {
            setData( products.data() )
        } )
    }

    const GuideRef: any = useRef();
    const [ guide, setGuide ]: any = useState( data.guide )
    const GuideSheet = () => (
        <Guide
            initialData={data.guide}
            data={( data: any ) => {
                setGuide( data )
            }}
            blur={( value: boolean ) => {
                if ( value ) {
                    GuideRef.current.close()
                }
            }}
        />
    )

    const LayoutRef: any = useRef();
    const [ layouts, setLayouts ]: any = useState( data.layoutIdeas )
    const LayoutSheet = () => (
        <LayoutIdeas
            initialData={layouts}
            data={( data: any ) => {
                setLayouts( data )
            }}
            blur={( value: any ) => {
                if ( value ) {
                    LayoutRef.current.close()
                }
            }}
        />
    )
    const CompanionRef: any = useRef();
    const [ companions, setcompanions ]: any = useState( [] )
    const CompanionSheet = () => (
        <Companion
            data={( data: any ) => {
                setTimeout( async () => {
                    let result = await ImagePicker.launchImageLibraryAsync( {
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: true,
                        aspect: [ 4, 3 ],
                        quality: 1,
                    } );

                    if ( !result.cancelled ) {
                        setcompanions( [ ...companions, { name: data.name, type: data.type, image: result } ] );
                    }
                }, 500 );
            }}
            blur={( value: any ) => {
                if ( value ) {
                    CompanionRef.current.close()
                }
            }}
        />
    )
    const growthCalendarRef: any = useRef();
    const [ growthCalendar, setgrowthCalendar ]: any = useState( data.plantingCalendar )
    const growthCalendarSheet = () => (
        <GrowthCalendar
            initialData={growthCalendar}
            data={( data: any ) => {
                setgrowthCalendar( data )
            }}
            blur={( value: any ) => {
                if ( value ) {
                    growthCalendarRef.current.close()
                    setTimeout( () => {
                        growthCalendarGrowingRef.current.open()
                    }, 500 );
                }
            }}
        />
    )
    const growthCalendarGrowingRef: any = useRef();
    const [ growthCalendarGrowing, setgrowthCalendarGrowing ]: any = useState( data.growingCalendar )
    const growthCalendarGrowingSheet = () => (
        <GrowthCalendarGrowing
            initialData={growthCalendarGrowing}
            data={( data: any ) => {
                setgrowthCalendarGrowing( data )
            }}
            blur={( value: any ) => {
                if ( value ) {
                    growthCalendarGrowingRef.current.close()
                }
            }}
        />
    )


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
    const [ location, setlocation ]: any = useState( data.location )
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
    const [ shop, setShop ]: any = useState( data.shop )
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
    const [ sunAndWater, setsunAndWater ]: any = useState( data.sunAndWater )
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
                .ref( "products/" + Date.now() )
                .put( blob )
            let photo_url = await file.ref.getDownloadURL();
            images.push( photo_url )
        }
        setLoadingText( 'Merging Images' )
        for ( let index = 0; index <= data.images.length - 1; index++ ) {
            images.push( data.images[ index ] )
        }

        setLoadingText( "Uploading New Companions..." )
        let companionsArray: any = []
        for ( let index = 0; index <= companions.length - 1; index++ ) {
            const response = await fetch( companions[ index ].image.uri );
            const blob = await response.blob();
            let file = await firebase
                .storage()
                .ref( "companions/" + Date.now() )
                .put( blob )

            let photo_url = await file.ref.getDownloadURL();
            companionsArray.push( {
                uri: photo_url,
                name: companions[ index ].name,
                type: companions[ index ].type
            } )
        }
        setLoadingText( "Merging Companions..." )
        for ( let index = 0; index <= data.varieties.length - 1; index++ ) {
            companionsArray.push( data.varieties[ index ] )
        }
        setLoadingText( 'Registering New Product Information' )
        firebase.firestore().collection( 'product' ).doc( id ).update( {
            plantInfo: plantInfo,
            images: images,
            shop: shop,
            location: location,
            sunAndWater: {
                sun: sunAndWater.sun || 0,
                water: sunAndWater.water || 0
            },
            guide: guide,
            plantingCalendar: growthCalendar,
            growingCalendar: growthCalendar,
            varieties: companionsArray

        } ).then( () => {
            setLoadingText( 'All Set' )
            updateData()
            setTimeout( () => {
                setfiles( [] )
                setcompanions( [] )
                setLoading( false )
            }, 500 );
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


                <ScrollView style={[ styles.imageScrollView, data.images.length == 0 ? { position: 'absolute', left: -500 } : {} ]} horizontal={true} showsHorizontalScrollIndicator={false} >
                    {
                        data.images.map( ( image: any, index: any ) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        ConfrimSheetRef.current.open()
                                        let imagesArray = data.images
                                        setconfrimAction( {
                                            choices: [ 'Delete Image' ],
                                            callback: () => {
                                                imagesArray.splice( index, 1 )
                                                firebase.firestore().collection( 'product' ).doc( id ).update( { images: imagesArray } ).then( () => {
                                                    ConfrimSheetRef.current.close()
                                                    updateData()
                                                } )
                                            }
                                        } )
                                    }}>
                                    <Image style={styles.productImage} source={{ uri: image }} />
                                </TouchableOpacity>
                            )
                        } )

                    }
                    {
                        files.map( ( image: any, index: any ) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        ConfrimSheetRef.current.open()
                                        setconfrimAction( {
                                            choices: [ 'Delete Image' ],
                                            callback: () => {
                                                let filesArray = files
                                                filesArray.splice( index )
                                                setfiles( filesArray )
                                                ConfrimSheetRef.current.close()
                                            }
                                        } )

                                    }}>
                                    <Image key={index} style={styles.productImage} source={{ uri: image[ 'uri' ] }} />
                                </TouchableOpacity>
                            )
                        } )
                    }
                </ScrollView>


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
                                    choices: [ 'Delete Companion' ],
                                    callback: () => {
                                        varietyArray.splice( index, 1 )
                                        firebase.firestore().collection( 'product' ).doc( id ).update( {
                                            varieties: varietyArray
                                        } ).then( () => {
                                            ConfrimSheetRef.current.close()
                                            updateData()
                                        } )
                                    }
                                } )

                            }}>
                                <Image style={styles.cardImage} source={{ uri: variety.uri }} />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        color: Colors[ colorScheme ].text
                                    }}>
                                    {variety.name}
                                </Text>
                                <Text style={{
                                    textAlign: 'center',
                                    color: variety.type.includes( 'Bad' ) ? 'red' : 'green'
                                }}>{variety.type}</Text>
                            </TouchableOpacity>
                        )
                    } )

                    }
                    {companions.map( ( companion: any, index: any ) => {
                        return (
                            <TouchableOpacity key={index}
                                onPress={() => {
                                    ConfrimSheetRef.current.open()
                                    let varietyArray = companions
                                    setconfrimAction( {
                                        choices: [ 'Delete Companion' ],
                                        callback: () => {
                                            varietyArray.splice( index, 1 )
                                            setcompanions( varietyArray )
                                            ConfrimSheetRef.current.close()
                                        }
                                    } )
                                }}>
                                <Image style={styles.cardImage} source={{ uri: companion.image.uri }} />
                                <Text style={{
                                    textAlign: 'center',
                                    color: Colors[ colorScheme ].text
                                }}>{companion.name}</Text>
                                <Text style={{
                                    textAlign: 'center',
                                    color: companion.type.includes( 'Bad' ) ? 'red' : 'green'
                                }}>{companion.type}</Text>
                            </TouchableOpacity>
                        )
                    } )}
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
                    <TouchableOpacity style={styles.smallButtons} onPress={() => growthCalendarRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Growth Calendar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => GuideRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Guide</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => LayoutRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Layout Ideas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.smallButtons} onPress={() => CompanionRef.current.open()} >
                        <Text style={styles.smallButtonsText}>Add Companion</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.smallButtons} onPress={() => { setfiles( [] ) }}>
                        <Text style={styles.smallButtonsText}>Clear Uploaded Images</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.smallButtons} onPress={() => { setfiles( [] ) }}>
                        <Text style={styles.smallButtonsText}>Clear Uploaded Companions</Text>
                    </TouchableOpacity>



                </ScrollView>

                <ProductInputs
                    data={( data: any ) => {
                        setplantInfo( data )
                    }}
                    value={data}
                    type="Edit"
                />
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

            <BottomSheet
                ref={GuideRef}
                renderContent={GuideSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.1}
            />
            <BottomSheet
                ref={LayoutRef}
                renderContent={LayoutSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.1}
            />
            <BottomSheet
                ref={CompanionRef}
                renderContent={CompanionSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 1.35}
            />
            <BottomSheet
                ref={growthCalendarRef}
                renderContent={growthCalendarSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />
            <BottomSheet
                ref={growthCalendarGrowingRef}
                renderContent={growthCalendarGrowingSheet}
                visibleHeight={Dimensions.get( 'window' ).height - 50}
            />

        </View>
    );
}
