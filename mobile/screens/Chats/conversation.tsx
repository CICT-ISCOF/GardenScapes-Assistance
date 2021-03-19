import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Card from '../../shared/card';
import HeaderTitle from '../../shared/header-titile'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import Collection from '../../constants/firebase-firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Audio } from 'expo-av';


export default function Conversations( { navigation }: any ) {
    const colorScheme = useColorScheme();
    const [ chatMessages, setchats ]: any = React.useState( [] )
    const [ users, setusers ]: any = React.useState( [] )
    const [ played, setPlayed ]: any = React.useState( false );
    const [ sound, setSound ]: any = React.useState();
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/pop.mp3' )
        );
        setSound( sound );
        sound.setVolumeAsync( .03 )
        sound.playAsync();
    }
    React.useEffect( () => {
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
        onMount()
    }, [ navigation ] )

    async function onMount() {
        const user: any = await AsyncStorage.getItem( 'users' );
        const uid = JSON.parse( user ).uid;
        getConversations( uid );
    }

    async function getConversations( uid: any ) {
        Collection( 'chats' )
            .orderBy( 'created_at', 'desc' )
            .onSnapshot( async ( chats: any ) => {
                let chatsArray: any = []
                let usersArray: any = []
                let senderIds: any = []
                await Promise.all(
                    chats.forEach( async ( chat: any ) => {
                        if ( chat.data()[ 'sender' ] != uid ) {
                            if ( chat.data()[ 'receiver' ] == uid ) {
                                if ( !senderIds.includes( chat.data()[ 'sender' ] ) ) {
                                    senderIds.push( chat.data()[ 'sender' ] )
                                    chatsArray.push( chat.data()[ 'message' ] )
                                    usersArray.push( await getUser( chat.data()[ 'sender' ] ) )
                                    setchats( chatsArray )
                                    setusers( usersArray )
                                }
                            }
                        }
                    } )
                )
            } )
    }

    const getUser = async ( uid: any ) => {
        return new Promise( async ( resolve ) => {
            await Collection( 'users' ).where( 'uid', '==', uid ).get()
                .then( ( users ) => {
                    users.forEach( ( user ) => {
                        resolve( user.data() )
                    } )
                } )
        } )

    };

    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].background,
            flex: 1,
        }}>
            <HeaderTitle back={false} title='Chats' />

            <ScrollView>
                {/* <Text
                    style={
                        [ {
                            textAlign: 'center',
                            color: Colors[ colorScheme ].text,
                            paddingHorizontal: 100
                        },
                        users.length == 0 ? {} : { position: 'absolute', left: -500 }
                        ]}
                >
                    if you have clicked
                    {'\n'}
                    <Text style={{ fontWeight: 'bold', fontSize: 23 }}> Buy Now </Text>
                    {'\n'}
                    your conversations will up show here.
                    </Text> */}
                {
                    users.map( ( user: any, index: any ) => (
                        <Card
                            key={index}
                            title={user.fullanme}
                            body={chatMessages[ index ] + ""}
                            data={user.uid}
                            image={
                                user.profile_picture == null || user.profile_picture == undefined ?
                                    require( '../../assets/placeholders/profile.png' ) : { uri: user.profile_picture }
                            }
                        />
                    ) )
                }
            </ScrollView>
        </View>
    );
}
