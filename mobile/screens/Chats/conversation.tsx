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
    const colorScheme = useColorScheme();
    const [ sound, setSound ]: any = React.useState();
    const [ played, setPlayed ]: any = React.useState( false );

    const navigation = useNavigation();

    useEffect( () => {
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

    React.useEffect( () => {

        ( async () => {
            await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
                const uid = JSON.parse( user ).uid
                getConversations( uid )
            } )
        } )()
    }, [ navigation ] )



    const [ userIds, setuserIds ]: any = React.useState( [] )
    const [ chats, setchats ]: any = React.useState( [] )
    const [ users, setusers ]: any = React.useState( [] )


    function getConversations( uid: any ) {
        Collection( 'chats' )
            .orderBy( 'created_at', 'desc' )
            .onSnapshot( ( chats ) => {
                let usersUIDArray: any = []
                let chatsArray: any = []
                // let usersArray: any = []
                chats.forEach( ( chat ) => {
                    usersUIDArray.push( chat.data()[ 'uid' ] )
                    chatsArray.push( chat.data()[ 'message' ] )
                    getUser( chat.data()[ 'sender' ] )
                } )
                setuserIds( usersUIDArray )
                setchats( chatsArray )
            } )
    }


    function getUser( uid: any ) {
        let usersArray: any = []
        Collection( 'users' )
            .where( 'uid', '==', uid )
            .onSnapshot( ( users ) => {
                users.forEach( ( user ) => {
                    usersArray.push( user.data() )
                } )
            } )
        setusers( usersArray )
    }







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
                    userIds.map( ( user: any, index: any ) => {
                        return (
                            <Card title={user + '1'} body={chats[ index ]} image={require( '../../assets/placeholders/green.png' )} data='' />
                        )
                    } )
                }
            </ScrollView>


        </View>
    );
}
