import React from 'react';
import { View, Text, Image } from 'react-native';
import HeaderImage from '../../shared/header-image';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import styles from './menu.style'
import Menus from './menus';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default function Menu() {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View>
            <HeaderImage title="Menu" color="blue" back={false} />
            <View style={{
                padding: 20
            }}>


                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Profile')
                    }}
                    style={[styles.listContianer, {
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
                    }]}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/placeholders/green.png')}
                    />
                    <View style={[styles.texts,]}>
                        <Text
                            style={[
                                styles.name,
                                ,
                                { color: Colors[colorScheme].text },
                            ]}>
                            Juan Dela Cruz
                        </Text>
                        <Text
                            style={[
                                styles.position,
                                ,
                                { color: 'gray' },
                            ]}>
                            Viewer, Buyer, Seller
                        </Text>
                    </View>
                </TouchableOpacity>

                <Menus />


            </View>
        </View>
    );
}
