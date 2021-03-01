import React, { useState } from 'react';
import Margin from '../../shared/margin';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Image } from 'react-native';
import styles from './sign-up.style'

export default function SignUp() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [fullanme, setfullanme] = useState('')



    function login() {
        // if (password != confirmPassword) {
        //     alert(`Password doesn't match`)
        //     return
        // }
        // if (
        //     email == '' || password == '' || fullanme == ''
        // ) {
        //     alert(`All fields should not be empty`)
        //     return
        // }
        const data = {
            email: email,
            password: password,
            fullanme: fullanme,
        }
        navigation.navigate('Login')
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
            <Text style={styles.tagLine}>Shop & take care of the plants you love</Text>
            <Text style={styles.Signup}>Sign-up</Text>
            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} selectionColor={'#FF5500'} placeholder='Email'
                onChangeText={(text) => {
                    setEmail(text)
                }} />
            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} selectionColor={'#FF5500'} placeholder='Password'
                onChangeText={(text) => {
                    setpassword(text)
                }} />
            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} selectionColor={'#FF5500'} placeholder='Confirm Password'
                onChangeText={(text) => {
                    setconfirmPassword(text)
                }} />
            <TextInput style={[styles.input, { color: Colors[colorScheme].text }]} selectionColor={'#FF5500'} placeholder='Fullname'
                onChangeText={(text) => {
                    setfullanme(text)
                }} />
            <TouchableOpacity style={styles.button} onPress={() => { login() }}>
                <Text style={styles.buttonText}>Sign-up</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.ghost} onPress={() => { login() }}>
                <Text style={styles.ghostText}>Have an account?  <Text style={styles.ghostText1}>Log-in</Text> </Text>
            </TouchableOpacity>
        </View>
    );
}
