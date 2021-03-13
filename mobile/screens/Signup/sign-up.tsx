import React, { useState, useRef, useEffect } from 'react';
import Margin from '../../shared/margin';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import styles from './sign-up.style'
import firebase from "firebase";
import "firebase/firestore";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../shared/loader';

export default function SignUp() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    const [ email, setEmail ] = useState( '' )
    const [ password, setpassword ] = useState( '' )
    const [ confirmPassword, setconfirmPassword ] = useState( '' )
    const [ fullanme, setfullanme ] = useState( '' )

    const [ inputErrors, setErrors ]: any = useState( {
        email: false,
        password: false,
        fullanme: false,
        confirmPassword: false
    } )
    const [ firebaseError, setfirebaseError ]: any = useState( "" )


    let emailInput: any
    let passwordInput: any
    let confirmPasswordInput: any
    let fullnameInput: any


    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )

    useEffect( () => {
        getItem()
    }, [] )

    async function getItem() {
        if ( await AsyncStorage.getItem( 'users' ) != undefined ) {
            navigation.navigate( 'Root' )
        }
    }


    async function signup() {
        Keyboard.dismiss()
        setfirebaseError( '' )
        let errors: any = {
            email: false,
            password: false,
            fullanme: false,
            confirmPassword: false
        }
        setErrors( errors )
        if ( email == '' ) {
            errors.email = true
        }
        if ( password == '' ) {
            errors.password = true
        }
        if ( fullanme == '' ) {
            errors.fullanme = true
        }

        if ( password != confirmPassword ) {
            errors.confirmPassword = true
        }

        for ( let key in errors ) {
            if ( errors[ key ] == true ) {
                setErrors( errors )
                return
            }
        }
        let data: any = {
            email: email,
            password: password,
            fullanme: fullanme,
            profile_picture: null,
            blocked: false,
            role: 'User'
        }
        setLoading( true )
        setLoadingText( 'Creating your account' )
        await firebase.auth().createUserWithEmailAndPassword( data.email, data.password )
            .then( ( user: any ) => {
                data[ 'uid' ] = user.user.uid
                delete data[ 'password' ]
                firebase.firestore().collection( 'users' ).add( data )
                setLoadingText( 'Account Creation Successfull' )
                setTimeout( () => {
                    setLoading( false )
                    navigation.navigate( 'Login' )
                }, 300 );
            } )
            .catch( ( error: any ) => {
                alert( error )
                setLoading( false )
            } )
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
                justifyContent: 'center',

            }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS == 'ios' ? 'position' : 'height'}
                    style={{ flex: 1, justifyContent: 'center', }}>
                    <Image style={styles.image} source={require( '../../assets/logo.png' )} />
                    <Text style={styles.title}>GARDENSCAPES.</Text>
                    <Text style={styles.title1}>ASSISTANCE.</Text>
                    <Text style={styles.tagLine}>Shop & take care of the plants you love</Text>

                    <TextInput
                        ref={( input ) => { emailInput = input; }}
                        returnKeyType="next"
                        clearButtonMode="always"

                        onSubmitEditing={() => {
                            passwordInput.focus()
                        }}
                        style={
                            [ styles.input,
                            { color: Colors[ colorScheme ].text },
                            inputErrors.email == true ? styles.inputError : {}
                            ]
                        }
                        selectionColor={'#FF5500'}
                        placeholder='Email'
                        onChangeText={( text ) => {
                            setEmail( text )
                        }} />

                    <Text style={[ styles.errorText, inputErrors.email == true ? {} : { position: 'absolute', left: -500 } ]}>Username should not be empty</Text>


                    <TextInput secureTextEntry={true}
                        ref={( input ) => { passwordInput = input; }}
                        clearButtonMode="always"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            confirmPasswordInput.focus()
                        }}
                        style={
                            [ styles.input,
                            { color: Colors[ colorScheme ].text },
                            inputErrors.password == true ? styles.inputError : {}
                            ]
                        } selectionColor={'#FF5500'} placeholder='Password'
                        onChangeText={( text ) => {
                            setpassword( text )
                        }} />

                    <Text style={[ styles.errorText, inputErrors.password == true ? {} : { position: 'absolute', left: -500 } ]}>Password should not be empty</Text>

                    <TextInput secureTextEntry={true}
                        ref={( input ) => { confirmPasswordInput = input; }}
                        clearButtonMode="always"
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            fullnameInput.focus()
                        }}
                        style={
                            [ styles.input,
                            { color: Colors[ colorScheme ].text },
                            inputErrors.confirmPassword == true ? styles.inputError : {}
                            ]
                        }
                        selectionColor={'#FF5500'} placeholder='Confirm Password'
                        onChangeText={( text ) => {
                            setconfirmPassword( text )
                        }} />

                    <Text style={[ styles.errorText, inputErrors.confirmPassword == true ? {} : { position: 'absolute', left: -500 } ]}>
                        Confirm Password doesn't match
            </Text>

                    <TextInput
                        ref={( input ) => { fullnameInput = input; }}
                        clearButtonMode="always"
                        returnKeyType="done"
                        style={
                            [ styles.input,
                            { color: Colors[ colorScheme ].text },
                            inputErrors.fullanme == true ? styles.inputError : {}
                            ]
                        }
                        selectionColor={'#FF5500'} placeholder='Fullname'
                        onChangeText={( text ) => {
                            setfullanme( text )
                        }} />

                    <Text style={[ styles.errorText, inputErrors.fullanme == true ? {} : { position: 'absolute', left: -500 } ]}>Fullname should not be empty</Text>

                    {/* <Text style={ [ styles.errorText, firebaseError != '' ? {} : { position: 'absolute', left: -500 } ] }>{ firebaseError }</Text> */}

                    <TouchableOpacity style={styles.button} onPress={() => { signup() }}>
                        <Text style={styles.buttonText}>Sign-up</Text>
                    </TouchableOpacity >

                    <TouchableOpacity style={styles.ghost} onPress={() => {
                        navigation.navigate( 'Login' )
                    }}>
                        <Text style={styles.ghostText}>Have an account?  <Text style={styles.ghostText1}>Log-in</Text> </Text>
                    </TouchableOpacity>

                </KeyboardAvoidingView>
            </View>
        </View>
    );
}
