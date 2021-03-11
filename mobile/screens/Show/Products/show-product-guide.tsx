import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';

export default function ShowProductGuide( props: any ) {

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


                <Text style={{ fontSize: 20, fontWeight: '500', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', marginBottom: 10, marginTop: 20 }}>Land Preparation</Text>
                <Text style={{ color: 'gray', alignSelf: 'flex-start' }}>{props.data.guide.land_preparation}</Text>

                <Text style={{ fontSize: 20, fontWeight: '500', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', marginBottom: 10, marginTop: 20 }}>Planting</Text>
                <Text style={{ color: 'gray', alignSelf: 'flex-start' }}>{props.data.guide.planting}</Text>

                <Text style={{ fontSize: 20, fontWeight: '500', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', marginBottom: 10, marginTop: 20 }}>Caring</Text>
                <Text style={{ color: 'gray', alignSelf: 'flex-start' }}>{props.data.guide.caring}</Text>

                <Text style={{ fontSize: 20, fontWeight: '500', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', marginBottom: 10, marginTop: 20 }}>Harvesting</Text>
                <Text style={{ color: 'gray', alignSelf: 'flex-start' }}>{props.data.guide.harvesting}</Text>

                <Text style={{ fontSize: 20, fontWeight: '500', color: Colors[ colorScheme ].text, alignSelf: 'flex-start', marginBottom: 10, marginTop: 20 }}>Storing</Text>
                <Text style={{ color: 'gray', alignSelf: 'flex-start' }}>{props.data.guide.storing}</Text>

            </View>
        </View>
    );
}
