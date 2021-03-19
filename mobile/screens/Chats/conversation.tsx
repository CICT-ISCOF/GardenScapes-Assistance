import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Card from '../../shared/card';
import HeaderTitle from '../../shared/header-titile'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';
import Collection from '../../constants/firebase-firestore'
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


export default function Conversations() {
    const navigation = useNavigation();

    const colorScheme = useColorScheme();
    const [ sound, setSound ]: any = React.useState();
    const [ played, setPlayed ]: any = React.useState( false );

    const [ chatMessages, setchats ]: any = React.useState( [] )
    const [ users, setusers ]: any = React.useState( [] )

    const [ isLoading, setLoading ]: any = React.useState( true )

    useEffect( () => {
        onMount()
    }, [] )


    async function onMount() {
        await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
            const uid = JSON.parse( user ).uid
            getConversations( uid )
        } )
    }

    function getConversations( uid: any ) {
        Collection( 'chats' )
            .orderBy( 'created_at', 'desc' )
            .onSnapshot( ( chats ) => {
                let chatsArray: any = []
                let usersArray: any = []
                let senderIds: any = []
                chats.forEach( async ( chat ) => {
                    if ( chat.data()[ 'sender' ] == uid ) {
                    }
                    else {
                        if ( senderIds.includes( chat.data()[ 'sender' ] ) ) {

                        } else {
                            senderIds.push( chat.data()[ 'sender' ] )
                            chatsArray.push( chat.data()[ 'message' ] )
                            usersArray.push( await getUser( chat.data()[ 'sender' ] ) )
                            setchats( chatsArray )
                            setusers( usersArray )
                        }
                    }
                } )
                setchats( chatsArray )
                setusers( usersArray )
            } )

    }

    const getUser = ( uid: any ) => new Promise( ( resolve, reject ) => {
        Collection( 'users' )
            .where( 'uid', '==', uid )
            .get()
            .then( ( users ) => {
                users.forEach( ( user ) => {
                    resolve( user.data() )
                } )
            } )
    } )

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/tap.mp3' )
        );
        setSound( sound );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }

    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].background,
            flex: 1,
        }}>
            <HeaderTitle back={false} title='Chats' />

            <ScrollView>
                {
                    users.map( ( user: any, index: any ) => {
                        return (
                            <Card
                                title={user.fullanme}
                                body={chatMessages[ index ] + ""}
                                image={
                                    user.profile_picture == null || user.profile_picture == undefined ? require( '../../assets/placeholders/profile.png' ) : { uri: user.profile_picture }
                                }
                                data={user.uid} />
                        )
                    } )
                }
            </ScrollView>


        </View>
    );
}
