import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';


export default function Input() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [sender, setsender] = useState('')
    const [reciever, setreciever] = useState('')
    const [message, setmessage] = useState('')

    let chatmessage;

    function sendMessage() {
        const data = {
            sender: sender,
            reciever: reciever,
            message: message,
        }
        alert(message)
        Keyboard.dismiss()
        setmessage('')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'position' : 'height'}
            style={styles.container}>
            <View style={{
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',

            }}>

                <TextInput style={{
                    width: '85%', borderColor: 'rgba(150,150,150,.5)', borderWidth: 1,
                    borderRadius: 30,
                    padding: 10,
                    marginRight: 20,
                    paddingLeft: 15,
                    color: Colors[colorScheme].text,
                    maxHeight: 100
                }}
                    placeholder="Aa"
                    selectionColor={'#FF5500'}
                    value={message}
                    multiline
                    onChangeText={(text) => {
                        setmessage(text)
                    }}
                />
                <TouchableOpacity onPress={() => {
                    sendMessage()
                }}>
                    <Ionicons name="ios-send" size={24} color="#FF5500" co />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, position: 'absolute',
        bottom: 0
    },

});