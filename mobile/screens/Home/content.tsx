import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import styles from './home.style'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import firebase from 'firebase'



export default function Content( props: any ) {

    useEffect( () => {
        if ( props.color != 'orange' ) {
            getFruitAndVegies()
        } else {
            getPlantitas()

        }
    }, [ props.color ] )

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ plants, setplants ] = useState( [] )
    async function getPlantitas() {
        setplants( [] )
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
                                if ( props.category == 1 ) {
                                    navigation.navigate( 'ShowPlant', { data: data } )
                                    return
                                }
                                navigation.navigate( 'ShowProduct', { data: data } )
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






        </ScrollView>
    );
}

