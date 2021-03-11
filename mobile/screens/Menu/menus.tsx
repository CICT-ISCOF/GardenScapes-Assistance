import React, { useRef, useState } from 'react';
import styles from './menu.style';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ConfirmBottomSheet from '../../shared/confirm';
import BottomSheet from 'react-native-animated-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../shared/loader';


export default function Menus() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const internalStyles = StyleSheet.create( {
        itemWrapper: {
            backgroundColor: Colors[ colorScheme ].background,
            paddingVertical: 15,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(150,150,150,.1)',
            width: '100%'
        },

        iconHolder: {
            padding: 3,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
            backgroundColor: 'gray',
            marginRight: 20,
            width: 30
        },
        iconText: {
            fontWeight: '600',
            fontSize: 20,
            color: Colors[ colorScheme ].text,
            paddingLeft: 20,
        },
        seperator: {
            borderLeftWidth: 1,
            height: '100%',
            borderColor: 'rgba(150,150,150,.2)'
        }
    } );

    const [ isLoading, setisLoading ] = useState( false )
    const navigate = ( location: any ) => {
        navigation.navigate( location );
    };

    const ConfrimSheetRef: any = useRef();
    const LogOutSheet = () => {
        return (
            <ConfirmBottomSheet
                choices={[ 'Log-Out' ]}
                blur={( value: any ) => {
                    if ( value == true ) {
                        ConfrimSheetRef.current.close()

                    }
                }}
                calback={async () => {
                    setisLoading( true )
                    ConfrimSheetRef.current.close()
                    await AsyncStorage.clear()
                    navigation.navigate( 'Login' );
                    setisLoading( false )
                }}
            />
        )
    }




    return (
        <View style={{ flex: 1 }}>
            <Loader text={'Logging You Out...'} loading={isLoading} />
            <TouchableOpacity
                onPress={() => {
                    navigate( 'PlantList' );
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>

                    <View style={[ internalStyles.iconHolder, { backgroundColor: 'rgba(144,185,87,.1)' } ]}>
                        <MaterialCommunityIcons name="tree" size={24}
                            color='#90B957'
                        />
                    </View>
                    <View style={internalStyles.seperator} />
                    <Text style={internalStyles.iconText}>My Plantitos/Plantitas</Text>
                    <Entypo style={{ position: 'absolute', right: 10 }} name="chevron-thin-right" size={14} color="gray" />
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    navigate( 'ProductList' );
                }}
            >
                <View style={internalStyles.itemWrapper}>
                    <View style={[ internalStyles.iconHolder, { backgroundColor: 'rgba(255,85,0,.1)' } ]}>
                        <MaterialCommunityIcons name="fruit-cherries" size={24}
                            color='#FF5500'
                        />
                    </View>

                    <View style={internalStyles.seperator} />
                    <Text style={internalStyles.iconText}>My Products</Text>
                    <Entypo style={{ position: 'absolute', right: 10 }} name="chevron-thin-right" size={14} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'CommonPLantPests' );
                }}
            >
                <View style={internalStyles.itemWrapper}>
                    <View style={[ internalStyles.iconHolder, { backgroundColor: 'rgba(255,0,0,.1)' } ]}>
                        <Ionicons name="ios-bug" size={22}
                            color='red'
                        />
                    </View>

                    <View style={internalStyles.seperator} />
                    <Text style={internalStyles.iconText}>Common Plant Pests</Text>
                    <Entypo style={{ position: 'absolute', right: 10 }} name="chevron-thin-right" size={14} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate( 'PlantDisease' );
                }}  >
                <View style={internalStyles.itemWrapper}>
                    <View style={[ internalStyles.iconHolder, { backgroundColor: 'rgba(135,163,115,.1)' } ]}>
                        <FontAwesome5 name="disease" size={24}
                            color='#87A373'
                        />
                    </View>

                    <View style={internalStyles.seperator} />
                    <Text style={internalStyles.iconText}>Plant Disease and Disorders</Text>
                    <Entypo style={{ position: 'absolute', right: 10 }} name="chevron-thin-right" size={14} color="gray" />

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    flex: 1,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(150,150,150,.1)'
                }}
                onPress={() => {
                    ConfrimSheetRef.current.open()
                }}   >
                <View style={internalStyles.itemWrapper}>
                    <View style={[ internalStyles.iconHolder, { backgroundColor: 'rgba(150,150,150,.1)' } ]}>
                        <MaterialCommunityIcons name="logout" size={24} color="gray"
                        />
                    </View>

                    <View style={internalStyles.seperator} />
                    <Text style={internalStyles.iconText}>Log-out</Text>
                </View>
            </TouchableOpacity>

            <BottomSheet
                ref={ConfrimSheetRef}
                renderContent={LogOutSheet}
                visibleHeight={Dimensions.get( 'window' ).height / 3.5}
            />
        </View>
    );
}
