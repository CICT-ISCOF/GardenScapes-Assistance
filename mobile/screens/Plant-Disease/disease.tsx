import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderImage from '../../shared/header-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import "firebase/firestore";



export default function PlantDisease() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    useEffect( () => {
        getDiseases()
    }, [] )

    const [ diseases, setdiseases ] = useState( [] )

    function getDiseases() {
        setdiseases( [] )
        let diseasesArray: any = []
        firebase.firestore().collection( 'diseases' )
            .get().then( ( pests: any ) => {
                pests.forEach( ( pest: any ) => {
                    diseasesArray.push( pest.data() )
                } );
                setdiseases( diseasesArray )
            } ).catch( ( error ) => {
                console.log( error )
            } )
    }


    function truncateOnWord( str: any, limit: any ) {
        var trimmable = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u2028\u2029\u3000\uFEFF';
        var reg = new RegExp( '(?=[' + trimmable + '])' );
        var words = str.split( reg );
        var count = 0;
        return words.filter( function ( word: any ) {
            count += word.length;
            return count <= limit;
        } ).join( '' ) + '...';
    }





    return (
        <View style={ {
            flex: 1,
            backgroundColor: Colors[ colorScheme ].bg
        } }>
            <HeaderImage title="Plant Disease and Disorders" color="black" back={ true } />
            <View style={ {
                height: 1,
                backgroundColor: Colors[ colorScheme ].bg,
                position: 'relative',
                zIndex: 9,
                marginTop: 5
            } } />
            <ScrollView showsVerticalScrollIndicator={ false } style={ {
                flex: 1,
                padding: 20,
            } }>

                {
                    diseases.map( ( data: any, index: any ) => {
                        return (
                            <TouchableOpacity key={ index } style={ [ styles.container, { backgroundColor: Colors[ colorScheme ].background } ] } onPress={ () => {
                                navigation.navigate( 'ShowDisease', data )
                            } }>
                                <View style={ styles.textContainer }>
                                    <Text style={ [ styles.title, { color: Colors[ colorScheme ].text } ] }>{ data.title }</Text>
                                    <Text style={ {
                                        color: 'gray',
                                        marginTop: 7
                                    } }>
                                        { truncateOnWord( data.description, 50 ) }
                                    </Text>
                                </View>
                                <Image style={ styles.Image } source={ { uri: data.images[ 0 ] } } />
                            </TouchableOpacity>
                        )
                    } )

                }
                <View style={ { height: 50 } } />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: "gray",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        marginRight: 10
    },
    textContainer: {
        flex: 3,
        padding: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 23
    },
    Image: {
        width: 100, height: 110,
    },

} )
