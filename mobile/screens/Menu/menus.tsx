import * as React from 'react';
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

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function Menus() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const internalStyles = StyleSheet.create({
        itemWrapper: {
            backgroundColor: Colors[colorScheme].background,
            borderRadius: 7,
            paddingVertical: 15,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.17,
            shadowRadius: 5.49,
            elevation: 5,
        },
        icon: {
            marginRight: 10,
        },
        iconText: {
            fontWeight: '600',
            fontSize: 20,
            color: Colors[colorScheme].text,
        },
    });

    const navigate = (location: any) => {
        navigation.navigate(location);
    };

    const logout = () => {
        Alert.alert(
            'Log-out on GARDENSCAPE.ASSISTANCE?',
            'Are you sure you want to Log-out?',
            [
                {
                    text: 'Later',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Log-out',
                    onPress: () => {
                        navigation.navigate('Login');
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View>

            <TouchableOpacity
                onPress={() => {
                    navigate('PlantList');
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <MaterialCommunityIcons name="tree" size={24}
                        style={internalStyles.icon}
                        color='#90B957'
                    />
                    <Text style={internalStyles.iconText}>My Plantitos/Plantitas</Text>
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => {
                    navigate('ProductList');
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <MaterialCommunityIcons name="fruit-cherries" size={24}
                        style={internalStyles.icon}
                        color='#FF5500'
                    />
                    <Text style={internalStyles.iconText}>My Products</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate('CommonPLantPests');
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <Ionicons name="ios-bug" size={22}
                        style={internalStyles.icon}
                        color='red'
                    />
                    <Text style={internalStyles.iconText}>Common Plant Pests</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigate('PlantDisease');
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <FontAwesome5 name="disease" size={24}
                        style={internalStyles.icon}
                        color='#87A373'
                    />
                    <Text style={internalStyles.iconText}>Plant Disease and Disorders</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    logout();
                }}
                style={{
                    marginTop: 20,
                }}>
                <View style={internalStyles.itemWrapper}>
                    <MaterialCommunityIcons name="logout" size={24} color="gray"
                        style={internalStyles.icon}
                    />
                    <Text style={internalStyles.iconText}>Log-out</Text>
                </View>
            </TouchableOpacity>


        </View>
    );
}
