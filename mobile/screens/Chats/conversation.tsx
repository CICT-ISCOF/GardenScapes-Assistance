import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Card from '../../shared/card';
import HeaderTitle from '../../shared/header-titile'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';


export default function Conversations( { navigation }: any ) {
    const colorScheme = useColorScheme();
    const [ sound, setSound ]: any = React.useState();
    const [ played, setPlayed ]: any = React.useState( false );

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            require( '../../assets/audio/tap.mp3' )
        );
        setSound( sound );
        sound.setVolumeAsync( .1 )
        sound.playAsync();
    }

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'focus', () => {
            if ( played == false ) {
                playSound()
                setPlayed( true )
            }
        } )
        return () => {
            unsubscribe()
        }
    }, [ navigation ] )


    return (
        <View style={{
            backgroundColor: Colors[ colorScheme ].background,
            flex: 1,
        }}>
            <HeaderTitle back={false} title='Chats' />

            <Card title="Jamel Eid Yassin" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eaque alias rem quaerat. Aspernatur exercitationem, magni dolorum deleniti fugiat harum nulla ratione architecto, mollitia nisi sapiente similique, quo repudiandae obcaecati!" image={require( '../../assets/placeholders/green.png' )} data='' />

        </View>
    );
}
