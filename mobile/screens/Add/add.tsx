import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import HeaderTitle from '../../shared/header-titile'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import AddProducts from './Products/product'
import AddPlants from './Plants/plants'
import Loader from '../../shared/loader';

export default function Add() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ tab, settab ] = useState( 1 )
    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )
    const [ played, setPlayed ]: any = React.useState( false );

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/tap.mp3' )
        );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }

    useEffect( () => {
        return () => {
            navigation.addListener( 'focus', () => {
                if ( played == false ) {
                    playSound()
                    setPlayed( true )
                }
            } )
        }
    }, [ navigation ] )

    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].background,
            flex: 1,
        }}>
            <Loader text={loadingText} loading={loading} />
            <HeaderTitle back={false} title='Sell' />
            <View
                style={{
                    flexDirection: 'row',
                    borderBottomColor: 'rgba(150,150,150,.2)',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    width: Dimensions.get( 'window' ).width,
                    height: 35,
                }}
            >
                <View
                    style={{
                        width: '50%',
                        height: 25,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            settab( 1 )
                        }}
                    >
                        <Text
                            style={
                                [ {
                                    textAlign: 'center',
                                    color: Colors[ colorScheme ].text,
                                    fontSize: 16
                                },
                                tab == 1 ? { fontWeight: 'bold' } : { fontWeight: 'bold', color: 'rgba(150,150,150,.8)' }
                                ]}
                        >for Plantitos/Plantitas</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: '50%',
                        height: 25,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            settab( 2 )
                        }}
                    >
                        <Text
                            style={[
                                {
                                    textAlign: 'center',
                                    color: Colors[ colorScheme ].text,
                                    fontSize: 16
                                },
                                tab == 2 ? { fontWeight: 'bold' } : { fontWeight: 'bold', color: 'rgba(150,150,150,.8)' }
                            ]}
                        >
                            Normal Product
                            </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={
                        [
                            tab == 2 ? { marginLeft: '50%' } : {},
                            {
                                width: '50%',
                                borderWidth: 1,
                                borderColor: Colors[ colorScheme ].text
                                , position: 'absolute',
                                bottom: 0
                            }
                        ]}>
                </View>
            </View>

            <AddProducts
                loading={( value: any ) => {
                    setLoading( value )
                }}
                loadingText={( value: any ) => {
                    setLoadingText( value )
                }}
                visibility={tab == 1 ? false : true}
            />
            <AddPlants
                loading={( value: any ) => {
                    setLoading( value )
                }}
                loadingText={( value: any ) => {
                    setLoadingText( value )
                }}
                visibility={tab == 2 ? false : true}
            />
        </View >
    );
}
