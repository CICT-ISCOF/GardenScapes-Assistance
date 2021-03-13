import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function ShowPlantGuide( props: any ) {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();


    return (
        <View>
            <View style={{
                width: 70,
                height: 10,
                borderRadius: 30,
                backgroundColor: 'lightgray',
                alignSelf: 'center',
                transform: [ { translateY: -10 } ]
            }} />

            <View style={{
                backgroundColor: Colors[ colorScheme ].background,
                padding: 20,
                height: 1050,
                alignItems: 'center',
            }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: Colors[ colorScheme ].text }}>Guide</Text>


                <Text style={{ fontSize: 20, fontWeight: '500', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', marginBottom: 10, marginTop: 20 }}>Growing</Text>
                <Text style={{ color: 'gray', alignSelf: 'flex-start' }}>{props.data.plantInfo.growing}</Text>

                <Text style={{ fontSize: 20, fontWeight: '500', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', marginBottom: 10, marginTop: 20 }}>Caring</Text>
                <Text style={{ color: 'gray', alignSelf: 'flex-start' }}>{props.data.plantInfo.caring}</Text>

            </View>
        </View>
    );
}
