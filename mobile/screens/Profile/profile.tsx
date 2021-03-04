import React from 'react';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import HeaderTitle from '../../shared/header-titile'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BottomTabNavigator from '../../navigation/BottomTabNavigator'

export default function Profile() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            paddingTop: 30,
            backgroundColor: Colors[colorScheme].background,
        },
        menu: {
            fontWeight: '700',
            fontSize: 35,
            marginBottom: 30,
        },
        name: {
            textAlign: 'center',
            fontWeight: '700',
            fontSize: 28,
        },
        address: {
            marginTop: 20,
            textAlign: 'center',
            fontSize: 20,
        },
        list: {
            padding: 10,
            borderBottomWidth: 1,
            color: Colors[colorScheme].text,
            lineHeight: 30,
        },
        cover: {
            height: 250,
            width: '100%',
            resizeMode: 'cover',
            borderTopEndRadius: 20,
            borderTopLeftRadius: 20,
        },
        profileContainerMain: {
            backgroundColor: Colors[colorScheme].background,
            borderRadius: 100,
            marginTop: -100,
            height: 205,
            width: 205,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
            borderWidth: 2,
            borderColor: Colors[colorScheme].background,
        },
        profileContainer: {
            borderRadius: 100,
            borderWidth: 10,
            borderColor: 'gray',
            height: 198,
            width: 198,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
        },
        profile: {
            height: 190,
            width: 190,
            borderRadius: 100,
            borderWidth: 4,
            borderColor: Colors[colorScheme].background,
        },
    });

    return (
        <View style={{
            flex: 1,
        }}>
            <ScrollView style={{
                position: 'relative',
                zIndex: 1,
                flex: 1,
                backgroundColor: Colors[colorScheme].background,
            }}>
                <HeaderTitle back={true} title='Jamel Eid Yassin' />

                <Image
                    blurRadius={9}
                    style={styles.cover}
                    source={require('../../assets/placeholders/green.png')}

                />

                <View style={styles.profileContainerMain}>
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.profile}
                            source={require('../../assets/placeholders/green.png')}
                        />
                    </View>
                </View>
                <Text
                    style={[styles.name, { color: Colors[colorScheme].text }]}>
                    Juan De La Cruz
                </Text>
                <Text
                    style={[
                        styles.address,
                        { color: Colors[colorScheme].text },
                    ]}>
                    So-ol, Baortac Nuevo
            </Text>


                <View style={{
                    flexDirection: 'row',
                    borderBottomColor: 'rgba(150,150,150,.2)',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                    height: 55,
                    marginTop: 50
                }}>
                    <View style={{
                        width: '50%',
                        height: 35,
                    }}>
                        <TouchableOpacity onPress={() => {

                        }} >
                            <Text style={[{
                                textAlign: 'center',
                                color: Colors[colorScheme].text
                            }]}>for Plantitos/Plantitas</Text>
                            <Text style={[{
                                textAlign: 'center',
                                color: '#02AF50',
                                fontSize: 30
                            }]}>5</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '50%',
                        height: 35,
                    }}>
                        <TouchableOpacity onPress={() => {

                        }} >
                            <Text style={[{
                                textAlign: 'center',
                                color: Colors[colorScheme].text
                            }]}>Normal Products</Text>
                            <Text style={[{
                                textAlign: 'center',
                                color: '#FEB400',
                                fontSize: 30
                            }]}>5</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>

        </View>
    );
}
