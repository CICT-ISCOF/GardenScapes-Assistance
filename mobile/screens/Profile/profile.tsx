import React, { useState, useEffect, useRef } from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../shared/header-titile'
import { View, Text, Image, Platform, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import styles from './profile.style'
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import ConfirmBottomSheet from '../../shared/confirm';
import BottomSheet from 'react-native-animated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import Loader from '../../shared/loader';


export default function Profile() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ user, setUser ]: any = useState( {} )
    const [ userId, setUserId ]: any = useState( "" )
    const [ loading, setLoading ] = useState( false )
    const [ loadingText, setLoadingText ] = useState( 'Loading.....' )

    useEffect( () => {
        ( async () => {
            if ( Platform.OS !== 'web' ) {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if ( status !== 'granted' ) {
                    alert( 'Sorry, we need camera roll permissions to make this work!' );
                }
                await AsyncStorage.getItem( 'users' ).then( ( user: any ) => {
                    const uid = JSON.parse( user ).uid
                    getUser( uid )
                    getProductCount( uid )
                    getPlantCount( uid )
                } )
            }
        } )()
    }, [] )

    function getUser( uid: any ) {
        firebase.firestore().collection( 'users' )
            .where( 'uid', '==', uid )
            .onSnapshot( ( users: any ) => {
                users.forEach( ( user: any ) => {
                    setUser( user.data() )
                    setUserId( user.id )
                } )
            } )
    }

    const [ productCount, setproductCount ] = useState( 0 )
    function getProductCount( uid: any ) {
        firebase.firestore().collection( 'product' )
            .where( 'uid', '==', uid )
            .onSnapshot( ( products: any ) => {
                setproductCount( products.size )
            } )
    }

    const [ plantCount, setplantCount ] = useState( 0 )
    function getPlantCount( uid: any ) {
        firebase.firestore().collection( 'plantitas' )
            .where( 'uid', '==', uid )
            .onSnapshot( ( plantitas: any ) => {
                setplantCount( plantitas.size )
            } )
    }





    const navigate = ( location: any ) => {
        navigation.navigate( location );
    };



    async function openGallery() {
        let result = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [ 4, 3 ],
            quality: 1,
        } )
        if ( !result.cancelled ) {
            ConfrimSheetRef.current.close()
            setLoading( true )
            setLoadingText( 'Uploading Image' )
            const response = await fetch( result.uri );
            const blob = await response.blob();
            let file = await firebase
                .storage()
                .ref( "users/" + Date.now() )
                .put( blob )
            let photo_url = await file.ref.getDownloadURL()
            firebase.firestore().collection( 'users' ).doc( userId ).update( {
                profile_picture: photo_url
            } ).then( () => {
                setLoading( false )
            } )
        }
    }

    const ConfrimSheetRef: any = useRef();
    const [ confrimAction, setconfrimAction ]: any = useState( {} )
    const ConfirmSheet = () => {
        return (
            <ConfirmBottomSheet
                choices={confrimAction.choices}
                calback={async () => {
                    confrimAction.callback()
                }}
            />
        )
    }


    return (
        <View style={{ flex: 1, }}>
            <Loader text={loadingText} loading={loading} />
            <ScrollView style={{ position: 'relative', zIndex: 1, flex: 1, backgroundColor: Colors[ colorScheme ].background, }}>
                <HeaderTitle back={true} title={user.fullanme} />
                <Image
                    blurRadius={9}
                    style={styles.cover}
                    source={user.profile_picture == null ? require( '../../assets/placeholders/profile.png' ) : { uri: user.profile_picture }}
                />
                <TouchableOpacity
                    onPress={() => {
                        ConfrimSheetRef.current.open()
                        setconfrimAction( {
                            choices: [ 'Select Profile Picture' ],
                            callback: () => {
                                openGallery()
                            }
                        } )
                    }}
                    style={[ styles.profileContainerMain, {
                        backgroundColor: Colors[ colorScheme ].background,
                        borderColor: Colors[ colorScheme ].background
                    } ]}>
                    <View style={styles.profileContainer}>
                        <Image
                            style={[ styles.profile, { borderColor: Colors[ colorScheme ].background } ]}
                            source={user.profile_picture == null ? require( '../../assets/placeholders/profile.png' ) : { uri: user.profile_picture }}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        ConfrimSheetRef.current.open()
                        setconfrimAction( {
                            choices: [ 'Select Profile Picture' ],
                            callback: () => {
                                openGallery()
                            }
                        } )
                    }}
                    style={styles.cameraContainer}>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
                <Text style={[ styles.name, { color: Colors[ colorScheme ].text } ]}>{user.fullanme} </Text>
                <View style={styles.tabContainer}>
                    <View style={styles.tab}>
                        <TouchableOpacity onPress={() => {
                            navigate( 'PlantList' );
                        }} >
                            <Text style={[ styles.tabTitle, { color: Colors[ colorScheme ].text } ]}> for Plantitos/Plantitas  </Text>
                            <Text style={styles.tabNumber}>{plantCount}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tab}>
                        <TouchableOpacity onPress={() => {
                            navigate( 'ProductList' );
                        }} >
                            <Text style={[ styles.tabTitle, { color: Colors[ colorScheme ].text } ]}>Normal Products</Text>
                            <Text style={[ styles.tabNumber, { color: 'orange' } ]}>{productCount}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <BottomSheet
                ref={ConfrimSheetRef}
                renderContent={ConfirmSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3.5}
            />
        </View>
    );
}
