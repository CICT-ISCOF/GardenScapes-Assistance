import React, { useState } from 'react';

import { View, Text, Image } from 'react-native';
import Margin from '../../shared/margin';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import styles from './login.style'


export default function Login() {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    function signUp() {
        // if (
        //     email == '' || password == ''
        // ) {
        //     alert(`All fields should not be empty`)
        //     return
        // }
        const data = {
            email: email,
            password: password,
        }
        navigation.navigate('Root')
    }


    return (
        <View style={{
            backgroundColor: Colors[colorScheme].background,
            flex: 1,
            padding: 50,

        }}>
            <Margin />
            <Image style={styles.image} source={require('../../assets/logo.png')} />
            <Text style={styles.title}>GARDENSCAPES</Text>
            <Text style={styles.title1}>ASSISTANCE</Text>
            <Text style={styles.Signup}>Log-in</Text>

            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Username' selectionColor={'#FF5500'} />
            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} placeholder='Password' selectionColor={'#FF5500'} />
            <TouchableOpacity style={styles.button} onPress={() => { signUp() }}>
                <Text style={styles.buttonText}>Log-in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ghost} onPress={() => { navigation.navigate('SignUp') }}>
                <Text style={styles.ghostText}>Don't have an account?  <Text style={styles.ghostText1}>Sign-up</Text> </Text>
            </TouchableOpacity>
        </View>
    );
}
