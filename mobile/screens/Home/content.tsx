import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase'
import ShowPlantGuide from '../Show/Plants/show-guide';



export default function Content( props: any ) {

    useEffect( () => {
        setplants( [] )
        setproducts( [] )
        if ( props.category == 1 ) {
            getPlantitas()
            return
        }
        getFruitAndVegies()

    }, [ props.category ] )

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ plants, setplants ] = useState( [] )
    async function getPlantitas() {
        let plantsArray: any = []
        await firebase.firestore().collection( 'plantitas' ).get().then( async ( plantitas: any ) => {
            plantitas.forEach( async ( plant: any ) => {
                let plantInfo: any = {
                    plantInfo: plant.data()[ 'plantInfo' ],
                }
                await firebase.firestore().collection( 'varieties' ).where( 'platita_id', '==', plant.id ).get()
                    .then( ( varieties: any ) => {
                        varieties.forEach( ( variety: any ) => {
                            plantInfo.varieties = variety.data()[ 'varieties' ]
                        } )
                    } )
                await firebase.firestore().collection( 'plantita-images' ).where( 'platita_id', '==', plant.id ).get()
                    .then( ( images: any ) => {
                        images.forEach( ( image: any ) => {
                            plantInfo.images = image.data()[ 'images' ]
                        } )
                    } )
                plantsArray.push( plantInfo )
            } )
            setplants( plantsArray )
        } ).catch( ( error ) => {
            console.log( error )
        } )
    }


    const [ products, setproducts ] = useState( [] )
    async function getFruitAndVegies() {
        let productsArray: any = []
        await firebase.firestore().collection( 'product' ).get().then( async ( products: any ) => {
            products.forEach( async ( product: any ) => {
                let productInfo: any = {
                    plantInfo: product.data(),
                }
                await firebase.firestore().collection( 'products-images' ).where( 'product_id', '==', product.id ).get()
                    .then( ( images: any ) => {
                        images.forEach( ( image: any ) => {
                            productInfo.images = image.data()[ 'images' ]
                        } )
                    } )
                await firebase.firestore().collection( 'companions' ).where( 'product_id', '==', product.id ).get()
                    .then( ( companions: any ) => {
                        companions.forEach( ( companion: any ) => {
                            productInfo.companion = companion.data()[ 'varieties' ]
                        } )
                    } )
                productsArray.push( productInfo )
            } )
        } ).then( () => {
            setproducts( productsArray )
        } ).catch( ( error ) => {
            console.log( error )
        } )

    }


    return (
        <ScrollView horizontal={ true } showsHorizontalScrollIndicator={ false } style={ {
            paddingLeft: 20,
            height: '65%',
            width: '100%',
            paddingBottom: 20,
            marginTop: 20
        } }>
            {
                plants.map( ( data: any, key: any ) => {
                    return (
                        <View key={ key }
                            style={ [ styles.productContainer, { backgroundColor: props.color == 'orange' ? 'rgba(237,125,49,.2)' : 'rgba(8,173,79,.2)' } ] }
                        >
                            <Text style={ [ styles.plantName, { color: Colors[ colorScheme ].text } ] }>
                                { data.plantInfo.name }
                            </Text>
                            <Text style={ [ styles.quantity, { color: Colors[ colorScheme ].text } ] }>
                                { data.plantInfo.quantities + data.plantInfo.unit }available</Text>
                            <TouchableOpacity style={ styles.productImage } onPress={ () => {
                                navigation.navigate( 'ShowPlant', { data: data } )
                            } }>
                                <Image style={ styles.productImage } source={ { uri: data.images[ 0 ] } } />
                            </TouchableOpacity>
                            <Text style={ styles.price }>₱ { data.plantInfo.price }.00 </Text>
                            <TouchableOpacity onPress={ () => {
                                alert( 'Successfully added to cart' )
                                navigation.navigate( 'Cart' )
                            } } style={ styles.addToCartButton }>
                                <Feather name="shopping-cart" size={ 24 } color="white" />
                            </TouchableOpacity>
                        </View>
                    )
                } )
            }


            {
                products.map( ( data: any, key: any ) => {
                    return (
                        <View key={ key }
                            style={ [ styles.productContainer, { backgroundColor: props.color == 'orange' ? 'rgba(237,125,49,.2)' : 'rgba(8,173,79,.2)' } ] }
                        >
                            <Text style={ [ styles.plantName, { color: Colors[ colorScheme ].text } ] }>
                                { data.plantInfo.plantInfo.name }
                            </Text>
                            <Text style={ [ styles.quantity, { color: Colors[ colorScheme ].text } ] }>
                                { data.plantInfo.plantInfo.quantities + data.plantInfo.plantInfo.unit } available</Text>
                            <TouchableOpacity style={ styles.productImage } onPress={ () => {
                                navigation.navigate( 'ShowProduct', { data: data } )
                                alert( JSON.stringify( data ) )
                            } }>
                                <Image style={ styles.productImage } source={ { uri: data.images[ 0 ] } } />
                            </TouchableOpacity>
                            <Text style={ styles.price }>₱ { data.plantInfo.plantInfo.price }.00 </Text>
                            <TouchableOpacity onPress={ () => {
                                alert( 'Successfully added to cart' )
                                navigation.navigate( 'Cart' )
                            } } style={ styles.addToCartButton }>
                                <Feather name="shopping-cart" size={ 24 } color="white" />
                            </TouchableOpacity>
                        </View>
                    )
                } )
            }






        </ScrollView>
    );
}

