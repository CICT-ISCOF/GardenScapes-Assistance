import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import HeaderImage from '../../shared/header-image';
import Grid from 'react-native-grid-component';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import BottomSheet from 'react-native-animated-bottom-sheet';
import PestDescription from './pest-description';
import firebase from 'firebase';
import "firebase/firestore";


export default function CommonPLantPests() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();


    useEffect( () => {
        getPests()
    }, [] )


    const [ pests, setpests ]: any = useState( [] )
    async function getPests() {
        setpests( [] )
        let pestArray: any = []
        firebase.firestore().collection( 'pests' )
            .get().then( ( pests: any ) => {
                pests.forEach( ( pest: any ) => {
                    pestArray.push( pest.data() )
                } );
                setpests( pestArray )
            } ).catch( ( error ) => {
                console.log( error )
            } )
    }




    const [ pest, setpest ] = useState( {} )

    function setPests( data: any, index: any ) {
        return (
            <TouchableOpacity key={ index } onPress={ () => {
                setpest( {
                    data: data,
                } )
                PestDescRef.current.open()
            } } style={ [ styles.card, {
                backgroundColor: Colors[ colorScheme ].background
            } ] }>
                <Image style={ styles.cardImage } source={ { uri: data.images[ 0 ] } }></Image>
                <Text style={ [ styles.cardTitle, { color: Colors[ colorScheme ].text, fontWeight: '600' } ] } >{ data.title }</Text>
            </TouchableOpacity>
        )
    }

    const PestDescRef: any = useRef();
    const PestDescriptionSheet = () => (
        <PestDescription data={ pest } />
    );



    return (
        <View style={ {
            flex: 1,
            backgroundColor: Colors[ colorScheme ].bg
        } }>
            <HeaderImage title="Common Plant Pests" color="red" back={ true } />
            <View style={ {
                height: 1,
                backgroundColor: Colors[ colorScheme ].bg,
                position: 'relative',
                zIndex: 9,
                marginTop: 5
            } } />


            <Grid
                renderItem={ setPests }
                data={ pests }
                numColumns={ 2 }
            />



            <BottomSheet
                ref={ PestDescRef }
                renderContent={ PestDescriptionSheet }
                visibleHeight={ Dimensions.get( 'window' ).height - 50 }
            />

        </View>
    );
}


const styles = StyleSheet.create( {
    card: {
        margin: 10,
        padding: 10,
        borderRadius: 10
    },
    cardImage: {
        height: 160,
        width: 145,
        resizeMode: 'stretch'
    },
    cardTitle: {
        marginTop: 17,
        textAlign: 'center',
        marginBottom: 20
    },

} )