import HeaderTitle from '../../shared/header-titile'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from './input';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';


export default function ChatBox( { route }: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ myID, setMyID ]: any = React.useState( "" )
    const [ qunatity, setqunatity ]: any = React.useState( 0 )

    const { uid, data } = route.params

    React.useEffect( () => {
        ( async () => {
            await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
                const id = JSON.parse( user ).uid
                setMyID( id )
            } )
        } )()
        getReceiver()
        if ( route.params.chatBot == true ) {
            triggerChatBot()
        }
    }, [ navigation ] )

    const [ messages, setmessages ]: any = React.useState( [] )
    const [ receiver, setreceiver ]: any = React.useState( {} )


    function getReceiver() {
        firebase.firestore().collection( 'users' ).where( 'uid', '==', uid ).get().then( ( users ) => {
            users.forEach( user => {
                setreceiver( user.data() )
            } )
        } )
    }

    const [ step, setStep ] = React.useState( 0 )
    function triggerChatBot() {
        if ( step == 0 ) {
            botMessage(
                `Are you interested in buying ${ data.plantInfo.name }? The price is ${ data.plantInfo.price } per ${ data.plantInfo.unit }`
            )
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
            botMessage(
                `Thank you for your interest! We, ${ data.shop } will contact you as soon as one of our admins go online. If you are in a very hurry you may visit ${ data.location.display_name } or leave your phone number.`
            )
            setStep( 3 )
        }
        if ( step == 3 ) {
            botMessage(
                `We already saved your number. Thank you for your time we are hoping you to have ${ qunatity } ${ data.plantInfo.name } in no time.Your total is ${ parseInt( data.plantInfo.price ) * parseInt( qunatity ) }.`
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

    function sendMessage( message: string ) {
        let messagesArray = messages
        let messageToSend = {
            message: message,
            sender: receiver.uid,
            receiver: myID
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
        return
    }

    function botMessage( message: String ) {
        let messagesArray = messages
        let messageToSend = {
            message: message,
            sender: myID,
            receiver: receiver.uid
        }
        messagesArray.push( messageToSend )
        setmessages( messagesArray )
    }

    return (
        <View style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            backgroundColor: Colors[ colorScheme ].background,
        }}>
            <HeaderTitle back={true} title={receiver.fullanme} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    messages.map( ( conversation: any, index: any ) => {
                        if ( conversation.sender != receiver.uid ) {
                            return (
                                <View style={styles.sender} key={index}>
                                    <Text style={styles.senderText}>{conversation.message}</Text>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View style={[ styles.you, { backgroundColor: Colors[ colorScheme ].bg } ]} key={index}>
                                    <Text style={[ styles.youText, { color: Colors[ colorScheme ].text } ]}>{conversation.message}</Text>
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
    you: {
        padding: 5,
        maxWidth: '60%',
        borderRadius: 10,
        alignSelf: 'flex-end',
        margin: 10
    },
    youText: {
        padding: 5,

        color: 'gray',
    },
    sender: {
        padding: 5,
        backgroundColor: '#FF5500',
        maxWidth: '60%',
        borderRadius: 10,
        color: 'white',
        alignSelf: 'baseline',
        margin: 10
    },
    senderText: {
        padding: 5,

        color: 'white',

    },

} );