import React from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

export default function Loader( props: any ) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <BlurView
            intensity={ 100 }
            style={ [ {
                flex: 1,
                backgroundColor: Colors[ colorScheme ].background,
                alignSelf: 'center',
                justifyContent: 'center',
                position: 'absolute',
                zIndex: 99,
                height: '100%',
                width: '100%'
            },
            props.loading == true ? {} : { left: -500 }
            ] }>
            <ActivityIndicator
                size="large"
                color={ Colors[ colorScheme ].tint }
                style={ {
                    alignSelf: 'center',
                    marginBottom: 10
                } }
            />
            <Text
                style={ {
                    color: Colors[ colorScheme ].text,
                    alignSelf: 'center'
                } }
            >{ props.text }</Text>
        </BlurView >
    );
}
