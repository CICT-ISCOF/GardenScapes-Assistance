import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'
import HomeHeader from './home-header';
import PlaceHolder from './placeholder';

export default function Home() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ headerColor, setHeaderColor ] = useState( 'flat-green' )
    const [ category, setcategory ] = useState( 1 )
    const [ plants, setplants ]: any = useState( [] )
    const [ products, setproducts ]: any = useState( [] )
    const [ scroll, setscroll ] = useState( new Animated.Value( 0 ) )
    useEffect( () => {
        // setplants( [] )
        getPlantitas()
        getFruitAndVegies()

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
    async function getFruitAndVegies() {
        firebase.firestore().collection( 'product' )
            .onSnapshot( ( plants ) => {
                let plantsArray: any = [];
                plants.forEach( ( doc ) => {
                    plantsArray.push( doc.data() );
                } );
                setproducts( plantsArray )
            } );
    }
    function renderPlants( data: any ) {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate( 'ShowPlant', { data: data.item } )
                }}
                style={[
                    styles.productContainer,
                    { backgroundColor: Colors[ colorScheme ].background },
                ]}  >
                <Image style={styles.productImage} source={{ uri: data.item.images[ 0 ] || '' }} />
                <View style={[ styles.badge, data.item.shop == undefined ? { display: 'none' } : {} ]}>
                    <Text style={[ styles.badgeText, ]}>{data.item.shop}</Text>
                </View>
                <Text style={[ styles.plantName, { color: Colors[ colorScheme ].text } ]}>
                    {data.item.plantInfo.name}
                </Text>
                <Text style={[ styles.quantity, { color: 'gray' } ]}>
                    {data.item.plantInfo.quantities + data.item.plantInfo.unit} available
                </Text>
                <Text style={[ styles.price, { fontSize: 14, fontWeight: '300' } ]}>₱
                    <Text style={styles.price}>{data.item.plantInfo.price}</Text>
                    .00
                </Text>
            </TouchableOpacity>
        )
    }
    function renderProducts( data: any ) {
        return (
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate( 'ShowProduct', { data: data.item } )
                }}
                style={[ styles.productContainer, { backgroundColor: Colors[ colorScheme ].background } ]}  >
                <Image style={styles.productImage} source={{ uri: data.item.images[ 0 ] || '' }} />
                <View style={[ styles.badge, data.item.shop == undefined ? { display: 'none' } : {} ]}>
                    <Text style={[ styles.badgeText, ]}>{data.item.shop}</Text>
                </View>
                <Text style={[ styles.plantName, { color: Colors[ colorScheme ].text } ]}>
                    {data.item.plantInfo.name}
                </Text>
                <Text style={[ styles.quantity, { color: 'gray' } ]}>
                    {data.item.plantInfo.quantities + data.item.plantInfo.unit} available
                </Text>
                <Text style={[ styles.price, { fontSize: 14, fontWeight: '300' } ]}>₱
                    <Text style={styles.price}>{data.item.plantInfo.price}</Text>
                    .00
                </Text>
            </TouchableOpacity>
        )
    }
    const renderPlaceholder = () => (
        <PlaceHolder />
    )
    const [ show, setShow ] = useState( true )
    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].bg,
            flex: 1
        }}>
            <HomeHeader
                headerColor={headerColor}
                category={category}
                show={show}
                setHeaderColor={( value: any ) => {
                    setHeaderColor( value )
                }}
                setcategory={( value: any ) => {
                    setcategory( value )
                }}
            />
            <FlatList
                onScroll={( event ) => {
                    if ( plants.length > 4 ) {
                        if ( event.nativeEvent.contentOffset.y > 50 ) {
                            setShow( false )
                        } else {
                            setShow( true )
                        }
                    }
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
                    if ( products.length > 4 ) {
                        if ( event.nativeEvent.contentOffset.y > 50 ) {
                            setShow( false )
                        } else {
                            setShow( true )
                        }
                    }
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
