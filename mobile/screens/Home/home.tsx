import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import firebase from 'firebase'
import HomeHeader from './home-header';
import PlaceHolder from './placeholder';
import HomePlants from './homePlants';
import HomeProducts from './homeData';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import SearchScreen from './searchScreen';


export default function Home() {
    const colorScheme = useColorScheme();
    const [ headerColor, setHeaderColor ] = useState( 'flat-green' )
    const [ category, setcategory ] = useState( 1 )
    const [ plants, setplants ]: any = useState( [] )
    const [ products, setproducts ]: any = useState( [] )
    const [ played, setPlayed ]: any = React.useState( false );
    const [ sound, setSound ]: any = React.useState();
    const [ showSearch, setshowSearch ]: any = React.useState( false );
    const [ loading, setloading ]: any = React.useState( false );


    const navigation = useNavigation();

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/tap.mp3' )
        );
        setSound( sound );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }
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

    useEffect( () => {
        getPlantitas()
    }, [ category ] )

    async function getPlantitas() {
        firebase.firestore().collection( 'plantitas' )
            .onSnapshot( ( plants ) => {
                let plantsArray: any = [];
                plants.forEach( ( doc ) => {
                    plantsArray.push( doc.data() );
                } );
                setplants( plantsArray )
                finish()
            } );
    }

    async function getCategories() {
        setplants( [] )
        let productsArray: any = []
        firebase.firestore().collection( 'product' )
            .onSnapshot( ( plants: any ) => {
                plants.forEach( ( doc: any ) => {
                    productsArray.push( doc.data() );
                } );
                setplants( productsArray )
                finish()
            } )
    }

    const renderPlants = ( data: any ) => (
        <HomePlants data={data} />
    )

    const renderProducts = ( data: any ) => (
        <HomeProducts data={data} />
    )

    const renderPlaceholder = () => (
        <PlaceHolder />
    )

    const [ show, setShow ] = useState( true )
    function scrollHandler( event: any, data: any ) {
        if ( event.nativeEvent.contentOffset.y > 1 ) {
            setShow( false )
        } else {
            setShow( true )
        }
    }

    async function pop() {
        setloading( true )
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/finish1.mp3' )
        );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }
    async function finish() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/pop.mp3' )
        );
        sound.setVolumeAsync( .05 )
        sound.playAsync();
        setloading( false )
    }
    return (
        <View style={{ backgroundColor: Colors[ colorScheme ].homeBG, flex: 1 }}>

            <SearchScreen
                show={showSearch}
                headerColor={headerColor}
                category={category}
                showSearch={() => {
                    setshowSearch( false )
                }}
                data={( data: any ) => {
                    if ( data.type == "plant" ) {
                        setplants( data.value )
                        return
                    }
                    setproducts( data.value )
                }}
            />

            <HomeHeader
                searchIsShowing={showSearch}
                showSearch={() => {
                    setshowSearch( true )
                }}
                headerColor={headerColor}
                category={category}
                show={show}
                data={( data: any ) => {
                    setproducts( data )
                }}
                setHeaderColor={( value: any ) => {
                    setHeaderColor( value )
                }}
                setcategory={( value: any ) => {
                    setcategory( value )
                }}
            />

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            pop()
                            getPlantitas()
                        }}
                    />
                }
                onScroll={( event ) => {
                    scrollHandler( event, plants )
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={plants.index}
                data={plants.length == 0 ? [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] : plants}
                renderItem={plants.length == 0 ? renderPlaceholder : renderPlants}
                style={[ category == 1 ? {} : { display: 'none', position: 'absolute', left: -500 } ]}
                numColumns={2}
            />

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => {
                            pop()
                            getCategories()
                        }}
                    />
                }
                onScroll={( event ) => {
                    scrollHandler( event, products )
                }}
                showsVerticalScrollIndicator={false}
                data={products.length == 0 ? [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] : products}
                renderItem={products.length == 0 ? renderPlaceholder : renderProducts}
                style={[ category == 2 ? {} : { display: 'none', position: 'absolute', left: -500 } ]}
                numColumns={2}
                keyExtractor={products.index}
            />
        </View>
    );
}
