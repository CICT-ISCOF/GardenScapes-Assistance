import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../shared/header-titile'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default function Add() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ tab, settab ] = useState( 1 )

    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )

    // useEffect( () => {
    //     setLoading( false )
    // }, [ loading == true ] )


    return (
        <View style={ {
            backgroundColor: Colors[ colorScheme ].background,
            flex: 1,
        } }>
            <Loader text={ loadingText } loading={ loading } />

            <HeaderTitle back={ false } title='Sell' />

            <View style={ {
                flexDirection: 'row',
                borderBottomColor: 'rgba(150,150,150,.2)',
                borderBottomWidth: 1,
                alignItems: 'center',
                width: Dimensions.get( 'window' ).width,
                height: 35,
            } }>
                <View style={ {
                    width: '50%',
                    height: 35,
                } }>
                    <TouchableOpacity onPress={ () => {
                        settab( 1 )
                    } } >
                        <Text style={ [ {
                            textAlign: 'center',
                            color: Colors[ colorScheme ].text
                        }, tab == 1 ? { fontWeight: 'bold' } : {} ] }>for Plantitos/Plantitas</Text>
                    </TouchableOpacity>
                </View>
                <View style={ {
                    width: '50%',
                    height: 35,
                } }>
                    <TouchableOpacity onPress={ () => {
                        settab( 2 )
                    } } >
                        <Text style={ [ {
                            textAlign: 'center',
                            color: Colors[ colorScheme ].text
                        }, tab == 2 ? { fontWeight: 'bold' } : {} ] }>Normal Products</Text>
                    </TouchableOpacity>
                </View>
                < View style={ [ tab == 2 ? { marginLeft: '50%' } : {}, { width: '50%', borderWidth: 1, borderColor: Colors[ colorScheme ].text, position: 'absolute', bottom: 0 } ] }>
                </View>
            </View>

            <AddProducts
                loading={ ( value: any ) => {
                    if ( value == true ) {
                    }
                    setLoading( value )
                } }
                loadingText={ ( value: any ) => {
                    setLoadingText( value )

                } }
                visibility={ tab == 1 ? false : true } />

            <AddPlants
                loading={ ( value: any ) => {
                    setLoading( value )
                } }
                loadingText={ ( value: any ) => {
                    setLoadingText( value )
                } }
                visibility={ tab == 2 ? false : true } />

        </View >


    );
}

import AddProducts from './Products/product'
import AddPlants from './Plants/plants'
import Loader from '../../shared/loader';
