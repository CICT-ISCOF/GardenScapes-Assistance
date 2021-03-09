import React, { useState } from 'react';

import { View, Text, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import Margin from '../../shared/margin';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import styles from './login.style'
import firebase from 'firebase';
import "firebase/firestore";


export default function Login() {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ email, setEmail ] = useState( '' )
    const [ password, setpassword ] = useState( '' )

    const [ inputErrors, setErrors ]: any = useState( {
        email: false,
        password: false,

    } )

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
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ( userCredential: any ) => {
                var user: any = userCredential.user;
                if ( user.displayName == null ) {
                    firebase
                        .firestore()
                        .collection( 'users' )
                        .where( 'email', '==', email )
                        .get()
                        .then( ( users: any ) => {
                            if ( users.size == 0 ) {
                                alert( `Can't login an administrator's account` )
                                return
                            }
                            users.forEach( ( user: any ) => {
                                if ( user.data()[ 'blocked' ] == true ) {
                                    alert( `You're account has been blocked` )
                                    return
                                }
                            } )
                        } ).then( () => {
                            navigation.navigate( 'Root' )
                        } )
                }

            } )
            .catch( ( error: any ) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert( errorCode )
                alert( errorMessage )
            } );
    }


    return (
        <View style={ {
            backgroundColor: Colors[ colorScheme ].background,
            flex: 1,
            padding: 50,

        } }>
            <KeyboardAvoidingView
                behavior={ Platform.OS == 'ios' ? 'position' : 'height' }
                style={ { flex: 1, justifyContent: 'center', } }>
                <Image style={ styles.image } source={ require( '../../assets/logo.png' ) } />
                <Text style={ styles.title }>GARDENSCAPES</Text>
                <Text style={ styles.title1 }>ASSISTANCE</Text>
                <Text style={ styles.Signup }>Log-in</Text>

                <TextInput
                    ref={ ( input ) => { emailInput = input; } }
                    returnKeyType="next"
                    onSubmitEditing={ () => {
                        passwordInput.focus()
                    } }
                    style={
                        [ styles.input, { color: Colors[ colorScheme ].text }
                        ] }
                    placeholder='E-mail'
                    selectionColor={ '#FF5500' }
                    onChangeText={ ( text ) => {

                        setEmail( text )
                    } } />
                <TextInput
                    secureTextEntry={ true }
                    ref={ ( input ) => { passwordInput = input } }

                    style={ [ styles.input, { color: Colors[ colorScheme ].text } ] } placeholder='Password' selectionColor={ '#FF5500' } onChangeText={ ( text ) => {
                        setpassword( text )
                    } } />
                <TouchableOpacity style={ styles.button } onPress={ () => {
                    login()
                } }>
                    <Text style={ styles.buttonText }>Log-in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.ghost } onPress={ () => { navigation.navigate( 'SignUp' ) } }>
                    <Text style={ styles.ghostText }>Don't have an account?  <Text style={ styles.ghostText1 }>Sign-up</Text> </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}
