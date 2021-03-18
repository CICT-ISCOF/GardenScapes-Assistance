import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';


export default function Input( props: any ) {
    const colorScheme = useColorScheme();

    const [ message, setmessage ] = useState( '' )


    function sendMessage() {
        props.message( message )
        Keyboard.dismiss()
        setmessage( '' )
    }


    const styles = StyleSheet.create( {
        container: {
            flex: 1, position: 'absolute',
            bottom: 0,
            backgroundColor: Colors[ colorScheme ].messageBG,
        },

    } );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'position' : 'height'}
            style={styles.container}>
            <BlurView
                intensity={100}
                style={{
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',

                }}>
                <TextInput
                    style={{
                        opacity: .8,
                        width: '85%',
                        borderRadius: 30,
                        padding: 14,
                        marginRight: 20,
                        paddingLeft: 15,
                        color: Colors[ colorScheme ].text,
                        maxHeight: 100,
                        backgroundColor: Colors[ colorScheme ].bg,
                    }}
                    placeholder="Aa"
                    selectionColor={'#FF5500'}
                    value={message}
                    multiline
                    placeholderTextColor="gray"
                    onChangeText={( text ) => {
                        setmessage( text )
                    }}
                />
                <TouchableOpacity onPress={() => {
                    sendMessage()
                }}>
                    <Ionicons name="ios-send" size={24} color="#FF5500" co />
                </TouchableOpacity>
            </BlurView>
        </KeyboardAvoidingView>

    );
}
