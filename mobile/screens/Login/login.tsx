import React, { useState } from 'react';

import { View, Text, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import styles from './login.style'
import firebase from 'firebase';
import "firebase/firestore";
import Loader from '../../shared/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ email, setEmail ] = useState( '' )
    const [ password, setpassword ] = useState( '' )
    const [ inputErrors, setErrors ]: any = useState( {
        email: false,
        password: false,

    } )

    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )


    let emailInput: any
    let passwordInput: any

    function login() {
        Keyboard.dismiss()
        let errors: any = {
            email: false,
            password: false,
        }
        setErrors( errors )
        if ( email == '' ) {
            errors.email = true
        }
        if ( password == '' ) {
            errors.password = true
        }
        for ( let key in errors ) {
            if ( errors[ key ] == true ) {
                setErrors( errors )
                return
            }
        }
        setLoading( true )
        setLoadingText( 'Logging you in..' )
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( async ( userCredential: any ) => {
                var uid: any = userCredential.user.uid;
                var apiKey: any = userCredential.user.apiKey;
                await AsyncStorage.setItem( 'users', JSON.stringify(
                    {
                        uid: uid,
                        apiKey: apiKey
                    }
                ) )
                setLoading( false )
                navigation.navigate( 'Root' )

            } )
            .catch( ( error: any ) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert( errorCode )
                alert( errorMessage )
                setLoading( false )
            } );
    }


    return (
        <View style={{
            flex: 1,
        }}>
            <Loader text={loadingText} loading={loading} />

            <View style={{
                backgroundColor: Colors[ colorScheme ].background,
                flex: 1,
                padding: 50,

            }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'position' : 'height'}
                    style={{ flex: 1, justifyContent: 'center', }}>
                    <Image style={styles.image} source={require( '../../assets/logo.png' )} />
                    <Text style={styles.title}>GARDENSCAPES</Text>
                    <Text style={styles.title1}>ASSISTANCE</Text>
                    <Text style={styles.Signup}>Log-in</Text>

                    <TextInput
                        ref={( input ) => { emailInput = input; }}
                        returnKeyType="next"
                        clearButtonMode="always"

                        onSubmitEditing={() => {
                            passwordInput.focus()
                        }}
                        style={
                            [ styles.input, { color: Colors[ colorScheme ].text }
                            ]}
                        placeholder='E-mail'
                        selectionColor={'#FF5500'}
                        onChangeText={( text ) => {

                            setEmail( text )
                        }} />
                    <TextInput
                        secureTextEntry={true}
                        ref={( input ) => { passwordInput = input }}
                        clearButtonMode="always"

                        style={[ styles.input, { color: Colors[ colorScheme ].text } ]} placeholder='Password' selectionColor={'#FF5500'} onChangeText={( text ) => {
                            setpassword( text )
                        }} />
                    <TouchableOpacity style={styles.button} onPress={() => {
                        login()
                    }}>
                        <Text style={styles.buttonText}>Log-in</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.ghost} onPress={() => { navigation.navigate( 'SignUp' ) }}>
                        <Text style={styles.ghostText}>Don't have an account?  <Text style={styles.ghostText1}>Sign-up</Text> </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
}
