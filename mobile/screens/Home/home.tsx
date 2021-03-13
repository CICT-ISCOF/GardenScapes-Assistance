import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import firebase from 'firebase'
import HomeHeader from './home-header';
import PlaceHolder from './placeholder';
import HomePlants from './homePlants';
import HomeProducts from './homeData';

export default function Home() {
    const colorScheme = useColorScheme();
    const [ headerColor, setHeaderColor ] = useState( 'flat-green' )
    const [ category, setcategory ] = useState( 1 )
    const [ plants, setplants ]: any = useState( [] )
    const [ products, setproducts ]: any = useState( [] )
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
            } );
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
    return (
        <View style={{ backgroundColor: Colors[ colorScheme ].homeBG, flex: 1 }}>
            <HomeHeader
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
                onScroll={( event ) => {
                    scrollHandler( event, plants )
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={plants.index}
                data={plants.length == 0 ? [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] : plants}
                renderItem={plants.length == 0 ? renderPlaceholder : renderPlants}
                style={[ category == 1 ? {} : { display: 'none' } ]}
                numColumns={2}
            />
            <FlatList
                onScroll={( event ) => {
                    scrollHandler( event, products )
                }}
                showsVerticalScrollIndicator={false}
                data={products.length == 0 ? [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] : products}
                renderItem={products.length == 0 ? renderPlaceholder : renderProducts}
                style={[ category == 2 ? {} : { display: 'none' } ]}
                numColumns={2}
                keyExtractor={products.index}
            />
        </View>
    );
}
