import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
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

    useEffect( () => {
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

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Plaza</Text>
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

                <View style={styles.badge}>
                    <Text style={styles.badgeText}>Plaza</Text>
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

    const renderPlaceholder = ( data: any ) => (
        <PlaceHolder />
    )


    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].bg,
            flex: 1
        }}>
            <FlatList
                ListHeaderComponent={() => (
                    <HomeHeader
                        headerColor={headerColor}
                        category={category}
                        setHeaderColor={( value: any ) => {
                            setHeaderColor( value )
                        }}
                        setcategory={( value: any ) => {
                            setcategory( value )
                        }}
                    />
                )}
                keyExtractor={plants.index}
                data={plants.length == 0 ? [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] : plants}
                renderItem={plants.length == 0 ? renderPlaceholder : renderPlants}
                style={[ category == 1 ? {} : { display: 'none' } ]}
                numColumns={2}
            />

            <FlatList
                ListHeaderComponent={() => (
                    <HomeHeader
                        headerColor={headerColor}
                        category={category}
                        setHeaderColor={( value: any ) => {
                            setHeaderColor( value )
                        }}
                        setcategory={( value: any ) => {
                            setcategory( value )
                        }}
                    />
                )}
                data={products.length == 0 ? [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] : products}
                renderItem={products.length == 0 ? renderPlaceholder : renderProducts}
                style={[ category == 2 ? {} : { display: 'none' } ]}
                numColumns={2}
                keyExtractor={products.index}
            />

            {/* <Content color={headerColor} category={category} /> */}
        </View>
    );
}
