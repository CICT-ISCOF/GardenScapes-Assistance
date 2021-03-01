import React from 'react';
import { View, Text } from 'react-native';
import Card from '../../shared/card';
import HeaderTitle from '../../shared/header-titile'
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
export default function Conversations() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <View style={{
            backgroundColor: Colors[colorScheme].background,
            flex: 1,
        }}>
            <HeaderTitle back={false} title='Chats' />
            <Card title="Jamel Eid Yassin" body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex eaque alias rem quaerat. Aspernatur exercitationem, magni dolorum deleniti fugiat harum nulla ratione architecto, mollitia nisi sapiente similique, quo repudiandae obcaecati!" image={require('../../assets/placeholders/green.png')} data='' />

        </View>
    );
}
