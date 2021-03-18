import HeaderTitle from '../../shared/header-titile'
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Input from './input';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Collection from '../../constants/firebase-firestore'
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { Audio } from 'expo-av';


export default function ChatBox( { route }: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ myID, setMyID ]: any = React.useState( "" )
    const [ qunatity, setqunatity ]: any = React.useState( 0 )

    const { uid, data } = route.params

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/pop.mp3' )
        );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }

    React.useEffect( () => {
        ( async () => {
            await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
                const id = JSON.parse( user ).uid
                setMyID( id )
                if ( route.params.chatBot == true ) {
                    getReceiver( id )
                }
            } )
        } )()
    }, [ navigation ] )

    const [ messages, setmessages ]: any = React.useState( [] )
    const [ receiver, setreceiver ]: any = React.useState( {} )

    const formatter = new Intl.NumberFormat( 'en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: "PHP",
    } )

    function getReceiver( id: any ) {
        Collection( 'users' ).where( 'uid', '==', uid ).get().then( ( users ) => {
            users.forEach( user => {
                setreceiver( user.data() )
                triggerChatBot( id )
            } )
        } )
        Collection( 'chats' )
            .orderBy( 'created_at', 'asc' )
            .onSnapshot( ( chats ) => {
                let chatsArray: any = []
                chats.forEach( ( chat ) => {
                    if ( chat.data()[ 'receiver' ] == uid && chat.data()[ 'sender' ] ) {
                        chatsArray.push( chat.data() )
                    }
                    if ( chat.data()[ 'sender' ] == uid && chat.data()[ 'receiver' ] ) {
                        chatsArray.push( chat.data() )
                    }
                } )
                setmessages( chatsArray )
            } )
    }



    const [ step, setStep ] = React.useState( 0 )
    function triggerChatBot( id: any ) {
        if ( step == 0 ) {
            botMessage(
                `Are you interested in buying ${ data.plantInfo.name }? The price is ${ formatter.format( parseFloat( data.plantInfo.price ) ) } per ${ data.plantInfo.unit }`
                , id )
            setStep( 1 )
        }
    }

    function agree() {
        if ( step == 0 ) {
            botMessage(
                `Session has expired please click buy now to continue chatting.`
            )
        }
        if ( step == 1 ) {
            botMessage(
                `How Many ${ data.plantInfo.name } would you like to buy? `
            )
            setStep( 2 )
        }
        if ( step == 2 ) {
            let appendedMessage = ''
            if ( data.location.display_name != undefined ) {
                appendedMessage = ` you may visit ${ data.location.display_name } or`
            }
            botMessage(
                `Thank you for your interest! We, ${ data.shop } will contact you as soon as one of our admins go online. If you are in a very hurry ${ appendedMessage } leave your phone number.`
            )
            setStep( 3 )
        }
        if ( step == 3 ) {
            botMessage(
                `We already saved your number. Thank you for your time we are hoping you to have ${ qunatity } ${ data.plantInfo.name } in no time.Your total is ${ formatter.format( data.plantInfo.price * parseFloat( qunatity ) ) }.`
            )
            setStep( 0 )
        }
    }

    function decline() {
        botMessage(
            `If you are somehow interested in this item please do not hesitate to click buy now. Thank you for your time.`
        )
        setStep( 0 )
    }

    const negation = [
        'No', 'D', 'Nd', 'Indi', 'Nope', 'Indi ko', 'Wag', 'Buwag'
    ]
    const ratification = [
        'Yes', 'Oo', 'Yep', 'Ok', 'Yup', 'Hou', 'Okay', 'Opo', 'Syempre'
    ]

    function sendMessage( message: string, id: any = myID ) {
        playSound()
        let messagesArray = messages
        let messageToSend = {
            message: message,
            sender: uid,
            receiver: id,
            created_at: Date.now(),
        }
        messagesArray.push( messageToSend )
        setmessages( messagesArray )
        if ( step == 2 ) {
            if ( parseInt( message ) != NaN ) {
                setStep( 3 )
                setqunatity( parseInt( message ) )
                agree()
            } else {
                botMessage(
                    `Please give us number of quantites`
                )
            }
        }
        if ( step == 3 ) {
            if ( parseInt( message ) != NaN && message.length == 11 ) {
                setStep( 4 )
                agree()
            } else {
                botMessage(
                    `Please enter you 11-digit phone number`
                )
            }
        }

        if ( negation.includes( message ) && route.params.chatBot == true ) {
            decline()
        }
        if ( ratification.includes( message ) && route.params.chatBot == true ) {
            agree()
        }
        Collection( 'chats' ).add( messageToSend )
        return
    }

    function botMessage( message: String, id: any = myID ) {
        playSound()
        let messagesArray = messages
        let messageToSend = {
            message: message,
            sender: id,
            receiver: uid,
            created_at: Date.now(),
        }
        messagesArray.push( messageToSend )
        setmessages( messagesArray )
        Collection( 'chats' ).add( messageToSend )
    }

    let scrollView: any;
    return (
        <View style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            backgroundColor: Colors[ colorScheme ].background,
        }}>
            <HeaderTitle back={true} title={receiver.fullanme} />
            <Image
                style={[ styles.receiverAvatar, {
                    transform: [
                        { translateY: -49 },
                        { translateX: 49 },
                    ],
                    marginBottom: -40
                } ]}
                source={
                    receiver.profile_picture == null || receiver.profile_picture == undefined ?
                        require( '../../assets/placeholders/profile.png' ) : { uri: receiver.profile_picture }}
            />
            <ScrollView
                style={{
                    paddingHorizontal: 14
                }}
                ref={ref => { scrollView = ref }}
                onContentSizeChange={() => scrollView.scrollToEnd( { animated: true } )}
                showsVerticalScrollIndicator={false}
            >
                {
                    messages.map( ( conversation: any, index: any ) => {
                        if ( conversation.sender != receiver.uid ) {
                            return (
                                <View
                                    key={index}
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    <Image
                                        style={[ styles.receiverAvatar, {
                                            alignSelf: 'flex-end',
                                            transform: [
                                                { translateY: -15 },
                                            ]
                                        } ]}
                                        source={
                                            receiver.profile_picture == null || receiver.profile_picture == undefined ?
                                                require( '../../assets/placeholders/profile.png' ) : { uri: receiver.profile_picture }}
                                    />
                                    <View style={[ styles.sender, { backgroundColor: Colors[ colorScheme ].message } ]} >
                                        <Text style={[ styles.youText, { color: Colors[ colorScheme ].text } ]}>{conversation.message}</Text>
                                    </View>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View style={[ styles.you ]} key={index}>
                                    <Text style={styles.senderText}>{conversation.message}</Text>
                                </View>
                            )
                        }
                    } )
                }
                <View style={{ height: 100 }} />
            </ScrollView>
            <Input
                message={( message: string ) => {
                    sendMessage( message )
                }}
            />
        </View>
    );
}



const styles = StyleSheet.create( {
    receiverAvatar: {
        height: 30,
        width: 30,
        borderRadius: 50

    },
    you: {
        padding: 5,
        maxWidth: '60%',
        borderRadius: 20,
        alignSelf: 'flex-end',
        margin: 10,
        backgroundColor: '#FF5500',
    },
    youText: {
        padding: 5,

        color: 'gray',
    },
    sender: {
        padding: 5,
        maxWidth: '60%',
        borderRadius: 20,
        color: 'white',
        alignSelf: 'baseline',
        margin: 10
    },
    senderText: {
        padding: 5,

        color: 'white',

    },

} );