import React from 'react';
import { View, Text, Image } from 'react-native';
import HeaderImage from '../../shared/header-image';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import styles from './menu.style'
import Menus from './menus';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';


export default function Menu() {

    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    const [ played, setPlayed ]: any = React.useState( false );
    const [ sound, setSound ]: any = React.useState();
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/tap.mp3' )
        );
        setSound( sound );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }
    useFocusEffect( () => {
        if ( played == false ) {
            playSound()
            setPlayed( true )
        }
    } )

    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].bg,
            flex: 1
        }}>
            <HeaderImage title="Menu" color="blue" back={false} />
            <Menus />
        </View>
    );
}
