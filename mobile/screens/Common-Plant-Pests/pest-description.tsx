import React from 'react';
import { View, Text, Image } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';


export default function PestDescription(props: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: Colors[colorScheme].bg,
                alignSelf: 'center',
                transform: [{ translateY: -10 }],

            }} />
            <View style={{
                backgroundColor: Colors[colorScheme].bg,
                padding: 20,
                height: 850,
                alignItems: 'center',
            }}>
                <Image style={{
                    width: '100%',
                    height: 200,
                    marginBottom: 30
                }} source={require('../../assets/placeholders/green.png')} />



                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text, }}>{props.data.name}</Text>

                <Text style={{
                    color: 'gray',
                    marginTop: 20
                }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, iusto! Sequi velit ullam quas eum, modi porro est maiores quo perspiciatis tenetur! Inventore ut fugiat sit aperiam, asperiores animi dignissimos.
                </Text>
            </View>
        </View>
    );
}
