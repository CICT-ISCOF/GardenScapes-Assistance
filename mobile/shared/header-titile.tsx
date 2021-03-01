import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Margin from './margin';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
export default function HeaderTitle(props: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <View>
            <Margin />
            <View style={{
                flexDirection: 'row',
                width: '100%',
                padding: 20,
                marginTop: -20
            }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={[
                    props.back == true ? {
                        marginRight: -20,
                        position: 'relative',
                        zIndex: 99
                    } : {
                            position: 'absolute',
                            left: -500
                        }
                ]}>
                    <Ionicons name="arrow-back-outline" size={24} color={Colors[colorScheme].text} />
                </TouchableOpacity>
                <View style={{
                    width: '100%',
                }}>
                    <Text style={{ color: Colors[colorScheme].text, fontSize: 25, textAlign: "center", fontWeight: 'bold' }}>{props.title}</Text>
                </View>
            </View>
        </View>
    );
}
