import HeaderTitle from '../../shared/header-titile'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from './input';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';


export default function ChatBox({ route }: any) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation();
    return (
        <View style={{
            position: 'relative',
            zIndex: 1,
            flex: 1,
            backgroundColor: Colors[colorScheme].background,
        }}>
            <HeaderTitle back={true} title='Jamel Eid Yassin' />

            <View style={styles.sender}>
                <Text style={styles.senderText}>Chat ni {route.params.chatBot == true ? 'sang chat bot' : ''}</Text>
            </View>

            <View style={styles.you}>
                <Text style={styles.youText}>design ka reply mo ni</Text>
            </View>

            <Input />
        </View>
    );
}



const styles = StyleSheet.create({
    you: {
        padding: 5,
        maxWidth: '60%',
        borderRadius: 30,
        alignSelf: 'flex-end',
        marginRight: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    youText: {
        padding: 5,

        color: 'gray',
    },
    sender: {
        padding: 5,
        backgroundColor: '#FF5500',
        maxWidth: '60%',
        borderRadius: 30,
        color: 'white',
        alignSelf: 'baseline',
        marginLeft: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    senderText: {
        padding: 5,

        color: 'white',

    },

});