import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { ScrollView } from 'react-native-gesture-handler';


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
                paddingTop: 0
            }}>

                {
                    props.data.data.images.map((image: any, index: any) => {
                        return (
                            <Image style={{
                                height: 300,
                                width: Dimensions.get('window').width,
                                resizeMode: 'stretch',
                                marginBottom: 30
                            }} source={{ uri: image }} />
                        )
                    })
                }



                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: Colors[colorScheme].text, }}>{props.data.data.title}</Text>

                <Text style={{
                    color: 'gray',
                    marginTop: 20
                }}>
                    {props.data.data.description}
                </Text>
            </View>
        </View>
    );
}
