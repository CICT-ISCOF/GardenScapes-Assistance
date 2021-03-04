import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function ConfirmBottomSheet(props: any) {


    const colorScheme = useColorScheme();
    const navigation = useNavigation();

    return (
        <View style={{
            height: Dimensions.get('window').height / 3.5,
            padding: 10,
            flexDirection: 'column-reverse',
            paddingBottom: 40
        }}>

            <TouchableOpacity
                onPress={() => {
                    props.blur(true)
                }}
                style={{
                    backgroundColor: Colors[colorScheme].background,
                    borderRadius: 10,
                    width: '100%',
                    padding: 15
                }}>
                <Text style={{
                    color: Colors[colorScheme].text,
                    fontWeight: '500',
                    textAlign: 'center',
                    fontSize: 25
                }}>Cancel</Text>
            </TouchableOpacity>

            <View style={{
                backgroundColor: Colors[colorScheme].background,
                borderRadius: 10,
                width: '100%',
                marginBottom: 10
            }}>
                {
                    props.choices.map((choices: any, index: any) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    props.calback(() => {
                                        alert('ma delete')
                                    })
                                }}
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor: 'rgba(150,150,150,.3)',
                                    backgroundColor: Colors[colorScheme].background,
                                    borderRadius: 10,
                                    width: '100%',
                                    padding: 15,

                                }}>
                                <Text style={{
                                    color: 'red',
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontWeight: '300'
                                }}>{choices}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        </View>
    );
}
